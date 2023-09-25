import { useState } from 'react'

import SWDtabs from './components/SWDtabs/SWDtabs'
import SWDscorepad from './components/SWDscorepad/SWDscorepad'
import SWDvictories from './components/SWDvictories/SWDvictories'

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const player1 = 'Marian'
const player2 = 'Dinael'
const agora = true
const pantheon = true

function App() {
  const playerOne = player1.trim() === "" ? 'Ludio I' : player1
  const playerTwo = player2.trim() === "" ? 'Ludio II' : player2

  const [total1, setTotal1] = useState<number>(0)
  const [total2, setTotal2] = useState<number>(0)

  const updateTotal1 = (newTotal: number) => {
    setTotal1(newTotal);
  };

  const updateTotal2 = (newTotal: number) => {
    setTotal2(newTotal);
  };

  return (
    <>
      <header>header</header>
      <main style={{ display: 'grid', margin: '0 auto', maxInlineSize: '35rem' }}>
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
        <dl>
          <div>
            <dt>Ludio I</dt>
            <dd>{total1}</dd>
          </div>
          <div>
            <dt>Ludio II</dt>
            <dd>{total2}</dd>
          </div>
        </dl>
        <SWDvictories showAgora={agora}></SWDvictories>
      </main>
      <footer>
        Footer
      </footer>
    </>
  )
}

export default App

{/* <GameProvider>
  <Router>
    <Switch>
      <Route path="/scorepad">
        <Scorepad />
      </Route>
      <Route path="/">
        <Configuration />
      </Route>
    </Switch>
  </Router>
</GameProvider> */}
