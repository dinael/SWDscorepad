import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";

type GameContextType = {
  showAgora: boolean;
  showPantheon: boolean;
  toggleAgora: () => void;
  togglePantheon: () => void;
  language: string;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [showAgora, setShowAgora] = useState(false);
  const [showPantheon, setShowPantheon] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const toggleAgora = useCallback(() => {
    setShowAgora((prev) => !prev);
  }, []);

  const togglePantheon = useCallback(() => {
    setShowPantheon((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ showAgora, showPantheon, toggleAgora, togglePantheon, language }),
    [showAgora, showPantheon, toggleAgora, togglePantheon, language],
  );

  return (
    <GameContext.Provider value={value}>
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
