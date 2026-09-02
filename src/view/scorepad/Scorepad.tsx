import {
  FC,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useReducer,
} from "react";
import { useTranslation } from "react-i18next";

import styles from "./Scorepad.module.scss";
import VP2 from "../../assets/images/vp-2.svg";
import SWDtabs from "../../components/SWDtabs/SWDtabs";
import SWDscorepad from "../../components/SWDscorepad/SWDscorepad";
import SWDvictories from "../../components/SWDvictories/SWDvictories";
import { useGame } from "../../context/GameContext";
import { getInputsToUse, InputItem } from "../../data/inputValues";

const player1 = "";
const player2 = "";

type ScoreValues = { [id: string]: string };

const buildInitialValues = (inputs: InputItem[]): ScoreValues => {
  const obj: ScoreValues = {};
  for (const { id, value } of inputs) {
    obj[id] = value || "";
  }
  return obj;
};

const calculateTotal = (values: ScoreValues, inputs: InputItem[]): number => {
  let sum = 0;
  for (const { id } of inputs) {
    sum += parseFloat(values[id]) || 0;
  }
  return sum;
};

type VictoryMessages = { [key: string]: string };

type ResultState = {
  winner: string | null;
  isTie: boolean;
  activeVictoryType: string;
  victoryMessages: VictoryMessages;
};

type ResultAction =
  | {
      type: "victory";
      victoryType: string;
      player: string;
      message: string;
    }
  | { type: "calculate"; winner: string | null; isTie: boolean }
  | { type: "reset" };

const initialResultState: ResultState = {
  winner: null,
  isTie: false,
  activeVictoryType: "",
  victoryMessages: { military: "", progress: "", political: "" },
};

const resultReducer = (state: ResultState, action: ResultAction): ResultState => {
  switch (action.type) {
    case "victory": {
      if (state.activeVictoryType !== "") return state;
      return {
        ...state,
        activeVictoryType: action.victoryType,
        winner: action.player,
        victoryMessages: {
          ...state.victoryMessages,
          [action.victoryType]: action.message,
        },
      };
    }
    case "calculate":
      return { ...state, winner: action.winner, isTie: action.isTie };
    case "reset":
      return initialResultState;
    default:
      return state;
  }
};

export const Scorepad: FC = () => {
  const { t, i18n } = useTranslation();
  const { showAgora, showPantheon } = useGame();
  const language = i18n.language;

  const playerOne = player1.trim() === "" ? t("player1") : player1;
  const playerTwo = player2.trim() === "" ? t("player2") : player2;

  const inputsToUse = useMemo(
    () => getInputsToUse(showAgora, showPantheon),
    [showAgora, showPantheon],
  );
  const inputsKey = inputsToUse.map((i) => i.id).join(",");

  const [playerValues, setPlayerValues] = useState<{
    "1": ScoreValues;
    "2": ScoreValues;
  }>(() => ({
    "1": buildInitialValues(inputsToUse),
    "2": buildInitialValues(inputsToUse),
  }));

  useEffect(() => {
    const fresh = buildInitialValues(inputsToUse);
    setPlayerValues({ "1": fresh, "2": fresh });
  }, [inputsToUse, inputsKey]);

  const total1 = useMemo(
    () => calculateTotal(playerValues["1"], inputsToUse),
    [playerValues, inputsToUse],
  );
  const total2 = useMemo(
    () => calculateTotal(playerValues["2"], inputsToUse),
    [playerValues, inputsToUse],
  );

  const tabActiveRef = useRef<string>(playerOne);
  const [result, dispatch] = useReducer(resultReducer, initialResultState);
  const { winner, isTie, activeVictoryType, victoryMessages } = result;

  useEffect(() => {
    tabActiveRef.current = playerOne;
  }, [language, playerOne]);

  const handleTabChange = useCallback((activeTab: string) => {
    tabActiveRef.current = activeTab;
  }, []);

  const handlePlayerChange = useCallback(
    (player: "1" | "2") => (id: string, value: string) => {
      setPlayerValues((prev) => ({
        ...prev,
        [player]: { ...prev[player], [id]: value },
      }));
    },
    [],
  );

  const handleVictory = useCallback(
    (type: string) => {
      const message = t("victoryTo", { type, player: tabActiveRef.current });
      dispatch({ type: "victory", victoryType: type, player: tabActiveRef.current, message });
    },
    [t],
  );

  const handleCalculateClick = useCallback(() => {
    if (total1 === 0 && total2 === 0) {
      dispatch({ type: "calculate", winner: null, isTie: false });
      return;
    }
    if (total1 === total2) {
      dispatch({ type: "calculate", winner: null, isTie: true });
    } else {
      dispatch({
        type: "calculate",
        winner: total1 > total2 ? playerOne : playerTwo,
        isTie: false,
      });
    }
  }, [total1, total2, playerOne, playerTwo]);

  const reloadPage = useCallback(() => {
    const fresh = buildInitialValues(inputsToUse);
    setPlayerValues({ "1": fresh, "2": fresh });
    dispatch({ type: "reset" });
  }, [inputsToUse]);

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
          name={playerOne}
          showAgora={showAgora}
          showPantheon={showPantheon}
          inputValues={playerValues["1"]}
          onChange={handlePlayerChange("1")}
          readOnly={inputReadOnly}
        />
        <SWDscorepad
          name={playerTwo}
          showAgora={showAgora}
          showPantheon={showPantheon}
          inputValues={playerValues["2"]}
          onChange={handlePlayerChange("2")}
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
