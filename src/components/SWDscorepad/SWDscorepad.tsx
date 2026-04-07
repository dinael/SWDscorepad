import { useState, ChangeEvent, FC, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  initialInputs,
  agoraInputs,
  pantheonInputs,
  InputItem,
} from "../../data/inputValues";

import styles from "./SWDscorepad.module.scss";

import SWDinput from "../SWDinput/SWDinput";

export type SWDscorepadProps = {
  name: string;
  showAgora?: boolean;
  showPantheon?: boolean;
  readOnly?: boolean;
  onUpdateTotal: (total: number) => void;
};

const getInputsToUse = (
  showAgora: boolean,
  showPantheon: boolean,
): InputItem[] => {
  if (!showAgora && !showPantheon) return initialInputs;
  return [
    ...initialInputs,
    ...(showAgora ? agoraInputs : []),
    ...(showPantheon ? pantheonInputs : []),
  ];
};

export const SWDscorepad: FC<SWDscorepadProps> = ({
  name,
  showAgora = false,
  showPantheon = false,
  readOnly,
  onUpdateTotal,
}: SWDscorepadProps) => {
  const { t, i18n } = useTranslation();
  const inputsToUse = useMemo(
    () => getInputsToUse(showAgora, showPantheon),
    [showAgora, showPantheon, i18n.language],
  );

  const [inputValues, setInputValues] = useState<{ [id: string]: string }>(() =>
    inputsToUse.reduce(
      (acc, { id, value }) => ({ ...acc, [id]: value || "" }),
      {},
    ),
  );

  useEffect(() => {
    const newValues: { [id: string]: string } = {};
    for (const input of inputsToUse) {
      newValues[input.id] = "";
    }
    setInputValues(newValues);
  }, [inputsToUse, showAgora]);

  const total = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < inputsToUse.length; i++) {
      const value = parseFloat(inputValues[inputsToUse[i].id]) || 0;
      sum += value;
    }
    return sum;
  }, [inputValues, inputsToUse]);

  const handleChange = useMemo(
    () => (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setInputValues((prev) => ({ ...prev, [id]: event.target.value }));
    },
    [],
  );

  onUpdateTotal(total);

  const initialInputsFiltered = inputsToUse.filter(
    (i) => !i.id.startsWith("inputAgora") && !i.id.startsWith("inputPantheon"),
  );
  const agoraInputsFiltered = inputsToUse.filter((i) =>
    i.id.startsWith("inputAgora"),
  );
  const pantheonInputsFiltered = inputsToUse.filter((i) =>
    i.id.startsWith("inputPantheon"),
  );

  const getImage = (
    image: string | { default: string; agora: string },
    _id: string,
  ) => {
    if (typeof image === "object" && "default" in image) {
      return showAgora ? image.agora : image.default;
    }
    return image;
  };

  return (
    <>
      <fieldset className={styles.SWDscorepad}>
        <h2 className="SWDscorepad-player-name sr-only">
          {name}'s {t("scorepad")}
        </h2>
        {initialInputsFiltered.map((input) => (
          <SWDinput
            key={input.id}
            label={t(input.label)}
            type="number"
            id={input.id}
            onChange={handleChange(input.id)}
            value={inputValues[input.id]}
            image={getImage(input.image, input.id)}
            placeholder={t(input.placeholder)}
            readOnly={readOnly}
          />
        ))}
        {agoraInputsFiltered.length > 0 && (
          <>
            <p className={styles.SWDscorepadSubtitle}>{t("agora")}</p>
            {agoraInputsFiltered.map((input) => (
              <SWDinput
                key={input.id}
                label={t(input.label)}
                type="number"
                id={input.id}
                onChange={handleChange(input.id)}
                value={inputValues[input.id]}
                image={getImage(input.image, input.id)}
                placeholder={t(input.placeholder)}
                readOnly={readOnly}
              />
            ))}
          </>
        )}
        {pantheonInputsFiltered.length > 0 && (
          <>
            <p className={styles.SWDscorepadSubtitle}>{t("pantheon")}</p>
            {pantheonInputsFiltered.map((input) => (
              <SWDinput
                key={input.id}
                label={t(input.label)}
                type="number"
                id={input.id}
                onChange={handleChange(input.id)}
                value={inputValues[input.id]}
                image={getImage(input.image, input.id)}
                placeholder={t(input.placeholder)}
                readOnly={readOnly}
              />
            ))}
          </>
        )}
        <output className={styles.srOnlyOutput} aria-hidden="true">
          {t("total")}: {total}
        </output>
      </fieldset>
    </>
  );
};

export default SWDscorepad;
