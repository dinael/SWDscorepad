import { ChangeEvent, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getInputsToUse } from "../../data/inputValues";

import styles from "./SWDscorepad.module.scss";

import SWDinput from "../SWDinput/SWDinput";

export type SWDscorepadProps = {
  name: string;
  showAgora?: boolean;
  showPantheon?: boolean;
  readOnly?: boolean;
  inputValues: { [id: string]: string };
  onChange: (id: string, value: string) => void;
};

export const SWDscorepad: FC<SWDscorepadProps> = ({
  name,
  showAgora = false,
  showPantheon = false,
  readOnly,
  inputValues,
  onChange,
}: SWDscorepadProps) => {
  const { t } = useTranslation();
  const inputsToUse = useMemo(
    () => getInputsToUse(showAgora, showPantheon),
    [showAgora, showPantheon],
  );

  const handleChange = useMemo(
    () => (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange(id, event.target.value);
    },
    [onChange],
  );

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
      </fieldset>
    </>
  );
};

export default SWDscorepad;
