import { FC, useState, useEffect, ChangeEvent } from 'react'
import { useGameContext } from '@/providers/GameContext'

import './SWDconfig.scss'

import SWDinput from '@/components/SWDinput/SWDinput'

export type SWDconfigProps = {
  id?: string
}

export const SWDconfig: FC<SWDconfigProps> = (props) => {
  const gameData = useGameContext()
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [agoraChecked, setAgoraChecked] = useState(gameData.showAgora)
  const [pantheonChecked, setPantheonChecked] = useState(gameData.showPantheon)

  const gameContext = useGameContext()

  useEffect(() => {
    setPlayer1(gameData.player1)
    setPlayer2(gameData.player2)
    setAgoraChecked(gameData.showAgora)
    setPantheonChecked(gameData.showPantheon)
  }, [gameData])

  const handlePlayer1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer1(event.target.value)
  }

  const handlePlayer2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer2(event.target.value)
  }

  const handleAgoraChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setAgoraChecked(checked)
    gameContext.updateGameConfig({ ...gameContext, showAgora: checked });
  }

  const handlePantheonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setPantheonChecked(checked)
    gameContext.updateGameConfig({ ...gameContext, showPantheon: checked });
  }

  const handleSaveConfig = () => {
    const newConfig: GameData = {
      player1: player1,
      player2: player2,
      showAgora: agoraChecked,
      showPantheon: pantheonChecked,
      //showSolo: /* Obtén el estado de las casillas de verificación */,
    }

    gameContext.updateGameConfig(newConfig)
  }

  console.log(`uno: ${player1} // dos: ${player2}`)

  return (
    <section className="swd-config" {...props}>
      <h2>Player names</h2>
      <SWDinput
        className="ludio-i"
        id={'player1'}
        label={'Ludio I'}
        type="text"
        showLabel
        variant={'vertical'}
        value={player1}
        maxLength={20}
        onChange={handlePlayer1Change}
      />
      <SWDinput
        className="ludio-ii"
        id={'player2'}
        label={'Ludio II'}
        type="text"
        showLabel
        variant={'vertical'}
        value={player2}
        maxLength={20}
        onChange={handlePlayer2Change}
      />
      <div className="config-expansions">
        <h2>Expansions</h2>
        <label>
          Agora
          <input
            className="btn-check check-agora"
            type="checkbox"
            id="config-agora"
            checked={agoraChecked}
            onChange={handleAgoraChange}
          />
        </label>
        <label>
          Pantheon
          <input
            className="btn-check check-pantheon"
            type="checkbox"
            id="config-pantheon"
            checked={pantheonChecked}
            onChange={handlePantheonChange}
          />
        </label>
      </div>
      <button className="btn-save" onClick={handleSaveConfig}>
        Save config
      </button>
    </section>
  )
}

export default SWDconfig
