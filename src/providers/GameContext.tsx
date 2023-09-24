import { createContext, useContext, useState, useEffect } from 'react'

export type GameData = {
  player1: string
  player2: string
  showAgora: boolean
  showPantheon: boolean
  showSolo: boolean
}

const GameContext = createContext<GameData | undefined>(undefined)

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext debe utilizarse dentro de GameProvider')
  }
  return context
}

interface GameProviderProps {
  children: React.ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [showAgora, setShowAgora] = useState(false)
  const [showPantheon, setShowPantheon] = useState(false)
  const [showSolo, setShowSolo] = useState(false)

  useEffect(() => {
    const storedPlayer1 = localStorage.getItem('player1')
    const storedPlayer2 = localStorage.getItem('player2')

    if (storedPlayer1 && storedPlayer2) {
      setPlayer1(storedPlayer1)
      setPlayer2(storedPlayer2)
    }
  }, [])

  const handleConfigChange = (config: string) => {
    setShowAgora(config === 'agora')
    setShowPantheon(config === 'pantheon')
    setShowSolo(config === 'solo')
  }

  const startGame = () => {
    localStorage.setItem('player1', player1)
    localStorage.setItem('player2', player2)

    if (player1 && player2) {
      if (showAgora || showPantheon || showSolo) {
        // Redirigir a "/scorepad"
      } else {
        // Redirigir a "/home"
      }
    }
  }

  const gameData: GameData = {
    player1,
    player2,
    showAgora,
    showPantheon,
    showSolo,
  }

  return (
    <GameContext.Provider value={gameData}>
      {children}
    </GameContext.Provider>
  )
}
