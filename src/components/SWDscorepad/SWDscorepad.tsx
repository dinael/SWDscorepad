import { useState, ChangeEvent, FC, useMemo, memo } from "react";
import {
  initialInputs,
  agoraInputs,
  pantheonInputs,
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

const getInputsToUse = (showAgora: boolean, showPantheon: boolean) => {
  if (!showAgora && !showPantheon) return initialInputs;
  return [
    ...initialInputs,
    ...(showAgora ? agoraInputs : []),
    ...(showPantheon ? pantheonInputs : []),
  ];
};

export const SWDscorepad: FC<SWDscorepadProps> = memo(
  ({
    name,
    showAgora = false,
    showPantheon = false,
    readOnly,
    onUpdateTotal,
  }: SWDscorepadProps) => {
    const inputsToUse = useMemo(
      () => getInputsToUse(showAgora, showPantheon),
      [showAgora, showPantheon],
    );

    const [inputValues, setInputValues] = useState<{ [id: string]: string }>(
      () =>
        inputsToUse.reduce(
          (acc, { id, value }) => ({ ...acc, [id]: value || "" }),
          {},
        ),
    );

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

    return (
      <>
        <fieldset className={styles.SWDscorepad}>
          <h2 className="SWDscorepad-player-name sr-only">{name}'s scorepad</h2>
          {initialInputs.map((input) => (
            <SWDinput
              key={input.id}
              label={input.label}
              type="number"
              id={input.id}
              onChange={handleChange(input.id)}
              value={inputValues[input.id]}
              image={input.image}
              placeholder={input.placeholder}
              readOnly={readOnly}
            />
          ))}
          {showAgora && (
            <>
              <p className={styles.SWDscorepadSubtitle}>Agora</p>
              {agoraInputs.map((input) => (
                <SWDinput
                  key={input.id}
                  label={input.label}
                  type="number"
                  id={input.id}
                  onChange={handleChange(input.id)}
                  value={inputValues[input.id]}
                  image={input.image}
                  placeholder={input.placeholder}
                  readOnly={readOnly}
                />
              ))}
            </>
          )}
          {showPantheon && (
            <>
              <p className={styles.SWDscorepadSubtitle}>Pantheon</p>
              {pantheonInputs.map((input) => (
                <SWDinput
                  key={input.id}
                  label={input.label}
                  type="number"
                  id={input.id}
                  onChange={handleChange(input.id)}
                  value={inputValues[input.id]}
                  image={input.image}
                  placeholder={input.placeholder}
                  readOnly={readOnly}
                />
              ))}
            </>
          )}
          <output className={styles.srOnlyOutput} aria-hidden="true">
            Total: {total}
          </output>
        </fieldset>
      </>
    );
  },
);

export default SWDscorepad;
