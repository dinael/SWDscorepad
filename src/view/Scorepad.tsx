import { FC, useState } from 'react'

import './Scorepad.scss'

import SWDtabs from '../components/SWDtabs/SWDtabs'
import SWDscorepad from '../components/SWDscorepad/SWDscorepad'
import SWDvictories from '../components/SWDvictories/SWDvictories'

interface ScorepadProps {
}

const player1 = 'Marian'
const player2 = 'Dinael'
const agora = true
const pantheon = true

export const Scorepad: FC<ScorepadProps> = (
  ...props
) => {

  const playerOne = player1.trim() === "" ? 'Ludio I' : player1
  const playerTwo = player2.trim() === "" ? 'Ludio II' : player2

  const [total1, setTotal1] = useState<number>(0)
  const [total2, setTotal2] = useState<number>(0)
  const [winner, setWinner] = useState<string | null>(null);
  // const [victory, setVictory] = useState<string | null>(null);

  const updateTotal1 = (newTotal: number) => {
    setTotal1(newTotal);
  };

  const updateTotal2 = (newTotal: number) => {
    setTotal2(newTotal);
  };

  const winnerIsActive = total1 === 0 && total2 === 0 ? true : false

  const handleCalculateClick = () => {
    if (total1 === 0 && total2 === 0) {
      setWinner(null);
    } else {
      const winner = total1 > total2 ? playerOne : total2 > total1 ? playerTwo : 'Empate';
      setWinner(winner);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const btnStatus = !winner ? handleCalculateClick : reloadPage

  return (
    <section
      className="scorepad"
      style={{ display: 'grid', margin: '0 auto', maxInlineSize: '35rem' }}
      {...props}>
      <SWDtabs
        tabName1={playerOne}
        tabName2={playerTwo}
        total1={total1}
        total2={total2}>
        <SWDscorepad
          name={playerOne}
          showAgora={agora}
          showPantheon={pantheon}
          onUpdateTotal={updateTotal1} />
        <SWDscorepad
          name={playerTwo}
          showAgora={agora}
          showPantheon={pantheon}
          onUpdateTotal={updateTotal2} />
      </SWDtabs>
      <SWDvictories showAgora={agora}></SWDvictories>
      <div className='calculate'>
        {winner && <p className='calculate-winner'>El ganador es: {winner}</p>}
        <button
          className={`calculate-btn ${winner && 'replay'}`}
          disabled={winnerIsActive}
          id="calculate"
          onClick={btnStatus}>
          {winner ? 'Replay' : 'Calculate'}
        </button>
      </div>
    </section>
  )
};

export default Scorepad;
