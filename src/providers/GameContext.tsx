import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export type GameData = {
  player1: string;
  player2: string;
  showAgora: boolean;
  showPantheon: boolean;
  showSolo: boolean;
};

type GameContextType = {
  gameData: GameData;
  updateGameConfig: (newConfig: GameData) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext debe utilizarse dentro de GameProvider");
  }
  return context;
}

interface GameProviderProps {
  children: React.ReactNode;
}

const initialGameData: GameData = {
  player1: "",
  player2: "",
  showAgora: false,
  showPantheon: false,
  showSolo: false,
};

type GameAction = { type: "update"; config: GameData };

const gameReducer = (state: GameData, action: GameAction): GameData => {
  switch (action.type) {
    case "update":
      return action.config;
    default:
      return state;
  }
};

export function GameProvider({ children }: GameProviderProps) {
  const [gameData, dispatch] = useReducer(gameReducer, initialGameData);

  useEffect(() => {
    const storedPlayer1 = localStorage.getItem("player1");
    const storedPlayer2 = localStorage.getItem("player2");

    if (storedPlayer1 && storedPlayer2) {
      dispatch({
        type: "update",
        config: {
          ...initialGameData,
          player1: storedPlayer1,
          player2: storedPlayer2,
        },
      });
    }
  }, []);

  const updateGameConfig = useCallback((newConfig: GameData) => {
    dispatch({ type: "update", config: newConfig });
  }, []);

  const contextValue = useMemo(
    () => ({ gameData, updateGameConfig }),
    [gameData, updateGameConfig],
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}
