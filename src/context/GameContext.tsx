import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type GameContextType = {
  showAgora: boolean;
  showPantheon: boolean;
  toggleAgora: () => void;
  togglePantheon: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [showAgora, setShowAgora] = useState(true);
  const [showPantheon, setShowPantheon] = useState(true);

  const toggleAgora = useCallback(() => {
    setShowAgora((prev) => !prev);
  }, []);

  const togglePantheon = useCallback(() => {
    setShowPantheon((prev) => !prev);
  }, []);

  return (
    <GameContext.Provider
      value={{ showAgora, showPantheon, toggleAgora, togglePantheon }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};
