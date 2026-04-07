import { FC, useState, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Scorepad.module.scss";
import VP2 from "../../assets/images/vp-2.svg";
import SWDtabs from "../../components/SWDtabs/SWDtabs";
import SWDscorepad from "../../components/SWDscorepad/SWDscorepad";
import SWDvictories from "../../components/SWDvictories/SWDvictories";
import { useGame } from "../../context/GameContext";

const player1 = "";
const player2 = "";

export const Scorepad: FC = () => {
  const { t, i18n } = useTranslation();
  const { showAgora, showPantheon } = useGame();
  const language = i18n.language;

  const playerOne = player1.trim() === "" ? t("player1") : player1;
  const playerTwo = player2.trim() === "" ? t("player2") : player2;

  const [total1, setTotal1] = useState<number>(0);
  const [total2, setTotal2] = useState<number>(0);
  const [tabActive, setTabActive] = useState<string>(playerOne);
  const [winner, setWinner] = useState<string | null>(null);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [activeVictoryType, setActiveVictoryType] = useState<string>("");
  const [victoryMessages, setVictoryMessages] = useState<{
    [key: string]: string;
  }>({
    military: "",
    progress: "",
    political: "",
  });
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (tabActive === playerOne || tabActive === playerTwo) {
      setTabActive(playerOne);
    } else {
      setTabActive(playerOne);
    }
  }, [language]);

  const updateTotal1 = useCallback((newTotal: number) => {
    setTotal1(newTotal);
  }, []);

  const updateTotal2 = useCallback((newTotal: number) => {
    setTotal2(newTotal);
  }, []);

  const handleTabChange = useCallback((activeTab: string) => {
    setTabActive(activeTab);
  }, []);

  const handleVictory = useCallback(
    (type: string) => {
      if (activeVictoryType !== "") {
        return;
      }

      const message = t("victoryTo", { type, player: tabActive });
      setVictoryMessages({ ...victoryMessages, [type]: message });
      setActiveVictoryType(type);
      setWinner(tabActive);
    },
    [activeVictoryType, tabActive, victoryMessages],
  );

  const handleCalculateClick = useCallback(() => {
    if (total1 === 0 && total2 === 0) {
      setWinner(null);
      setIsTie(false);
      return;
    }
    if (total1 === total2) {
      setWinner(null);
      setIsTie(true);
    } else {
      setWinner(total1 > total2 ? playerOne : playerTwo);
      setIsTie(false);
    }
  }, [total1, total2, playerOne, playerTwo]);

  const reloadPage = useCallback(() => {
    setTotal1(0);
    setTotal2(0);
    setWinner(null);
    setIsTie(false);
    setActiveVictoryType("");
    setVictoryMessages({ military: "", progress: "", political: "" });
    setResetKey((prev) => prev + 1);
  }, []);

  const inputReadOnly = !!winner;

  const victoryDisabled = !!(winner || activeVictoryType);

  const btnDisabled = total1 === 0 && total2 === 0 && !activeVictoryType;
  const btnStatus = winner || isTie ? reloadPage : handleCalculateClick;
  const showReplay = winner || isTie;

  const resultMessage = useMemo(() => {
    if (activeVictoryType) return victoryMessages[activeVictoryType];
    if (isTie) return t("itsATie");
    if (winner) return t("theWinnerIs", { winner });
    return null;
  }, [activeVictoryType, isTie, winner, victoryMessages, t]);

  return (
    <section className={styles.scorepad}>
      <SWDtabs
        tabName1={playerOne}
        tabName2={playerTwo}
        total1={total1}
        total2={total2}
        onTabChange={handleTabChange}
      >
        <SWDscorepad
          key={`p1-${resetKey}-${language}`}
          name={playerOne}
          showAgora={showAgora}
          showPantheon={showPantheon}
          onUpdateTotal={updateTotal1}
          readOnly={inputReadOnly}
        />
        <SWDscorepad
          key={`p2-${resetKey}-${language}`}
          name={playerTwo}
          showAgora={showAgora}
          showPantheon={showPantheon}
          onUpdateTotal={updateTotal2}
          readOnly={inputReadOnly}
        />
      </SWDtabs>
      <SWDvictories
        showAgora={showAgora}
        disabled={victoryDisabled}
        onMilitaryVictory={() => handleVictory("military")}
        onProgressVictory={() => handleVictory("progress")}
        onPoliticalVictory={() => handleVictory("political")}
      />
      <div className={styles.calculate}>
        {resultMessage && (
          <p className={styles.calculateWinner}>
            <img
              className="victory-symbol"
              src={VP2}
              alt=""
              aria-hidden="true"
            />
            {resultMessage}
          </p>
        )}
        <button
          className={`${styles.calculateBtn} ${showReplay ? styles.replay : ""}`}
          disabled={btnDisabled}
          id="calculate"
          onClick={btnStatus}
        >
          {showReplay ? t("replay") : t("calculate")}
        </button>
      </div>
    </section>
  );
};

export default Scorepad;
