import { createContext, useContext, useState, useEffect } from 'react';

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
    throw new Error('useGameContext debe utilizarse dentro de GameProvider');
  }
  return context;
}

interface GameProviderProps {
  children: React.ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [showAgora, setShowAgora] = useState(false);
  const [showPantheon, setShowPantheon] = useState(false);
  const [showSolo, setShowSolo] = useState(false);

  useEffect(() => {
    const storedPlayer1 = localStorage.getItem('player1');
    const storedPlayer2 = localStorage.getItem('player2');

    if (storedPlayer1 && storedPlayer2) {
      setPlayer1(storedPlayer1)
      setPlayer2(storedPlayer2);
    }
  }, []);

  const updateGameConfig = (newConfig: GameData) => {
    setPlayer1(newConfig.player1)
    setPlayer2(newConfig.player2)
    setShowAgora(newConfig.showAgora)
    setShowPantheon(newConfig.showPantheon)
    setShowSolo(newConfig.showSolo)
  };

  const gameData: GameData = {
    player1,
    player2,
    showAgora,
    showPantheon,
    showSolo,
  }

  return (
    <GameContext.Provider value={{ gameData, updateGameConfig }}>
      {children}
    </GameContext.Provider>
  );
}
