import { FC, useState } from 'react'

import './Scorepad.scss'

import SWDtabs from '../components/SWDtabs/SWDtabs'
import SWDscorepad from '../components/SWDscorepad/SWDscorepad'
import SWDvictories from '../components/SWDvictories/SWDvictories'

interface ScorepadProps {
}

const player1 = ''
const player2 = ''
const agora = true
const pantheon = true

export const Scorepad: FC<ScorepadProps> = (
  ...props
) => {

  const playerOne = player1.trim() === '' ? 'Ludio I' : player1
  const playerTwo = player2.trim() === '' ? 'Ludio II' : player2

  const [total1, setTotal1] = useState<number>(0)
  const [total2, setTotal2] = useState<number>(0)
  const [tabActive, setTabActive] = useState<string>(playerOne)
  const [winner, setWinner] = useState<string | null>(null)
  const [activeVictoryType, setActiveVictoryType] = useState<string>('')
  const [victoryMessages, setVictoryMessages] = useState<{ [key: string]: string }>({
    military: '',
    progress: '',
    political: '',
  })

  const updateTotal1 = (newTotal: number) => {
    setTotal1(newTotal)
  }

  const updateTotal2 = (newTotal: number) => {
    setTotal2(newTotal)
  }

  const handleTabChange = (activeTab: string) => {
    setTabActive(activeTab)
  }

  const handleVictory = (type: string) => {
    if (activeVictoryType !== '') {
      return
    }

    const message = `Victoria de ${type} para ${tabActive}`
    setVictoryMessages({ ...victoryMessages, [type]: message })
    setActiveVictoryType(type)
    setWinner(tabActive)
  }

  const handleCalculateClick = () => {
    if (total1 === 0 && total2 === 0) {
      setWinner(null)
    } else {
      const winner = total1 > total2 ? playerOne : total2 > total1 ? playerTwo : 'Empate'
      setWinner(winner)
    }
  }

  const reloadPage = () => {
    window.location.reload()
  }

  const inputReadOnly = winner ? true : false

  const btnDisabled = total1 === 0 && total2 === 0 && !activeVictoryType
  const btnStatus = winner ? reloadPage : handleCalculateClick

  return (
    <section
      className="scorepad"
      style={{ display: 'grid', margin: '0 auto', maxInlineSize: '35rem' }}
      {...props}>
      <SWDtabs
        tabName1={playerOne}
        tabName2={playerTwo}
        total1={total1}
        total2={total2}
        onTabChange={handleTabChange}
      >
        <SWDscorepad
          name={playerOne}
          showAgora={agora}
          showPantheon={pantheon}
          onUpdateTotal={updateTotal1}
          readOnly={inputReadOnly} />
        <SWDscorepad
          name={playerTwo}
          showAgora={agora}
          showPantheon={pantheon}
          onUpdateTotal={updateTotal2}
          readOnly={inputReadOnly} />
      </SWDtabs>
      <SWDvictories
        showAgora={agora}
        onMilitaryVictory={() => handleVictory('military')}
        onProgressVictory={() => handleVictory('progress')}
        onPoliticalVictory={() => handleVictory('political')}
      ></SWDvictories>
      <div className='calculate'>
        {activeVictoryType && <p>{victoryMessages[activeVictoryType]}</p>}
        {winner && !activeVictoryType &&
          <p className='calculate-winner'>
            El ganador es: {winner}
          </p>
        }
        <button
          className={`calculate-btn ${winner && 'replay'}`}
          disabled={btnDisabled}
          id="calculate"
          onClick={btnStatus}>
          {winner ? 'Replay' : 'Calculate'}
        </button>
      </div>
    </section>
  )
}

export default Scorepad
