import SWDscorepad from './components/SWDscorepad/SWDscorepad'
import SWDtabs from './components/SWDtabs/SWDtabs';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const player1 = 'Juan';
const player2 = 'Manolo';
const agora = false;
const pantheon = false;

function App() {

  // const [score1, setScore1] = useState(0);
  // const [score2, setScore2] = useState(0);
  // const [gameOver, setGameOver] = useState(false);
  // const [winner, setWinner] = useState('');
  // const [player1Name, setPlayer1Name] = useState('');
  // const [player2Name, setPlayer2Name] = useState('');
  // const [player1Score, setPlayer1Score] = useState(0);
  // const [player2Score, setPlayer2Score] = useState(0);

  const playerOne = player1.trim() === "" ? 'Ludio I' : player1
  const playerTwo = player2.trim() === "" ? 'Ludio II' : player2

  return (
    <>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <SWDtabs tabName1="Ludio I" tabName2="Ludio II">
          <SWDscorepad data-tab="Ludio I" name={playerOne} showAgora={agora} showPantheon={pantheon} />
          <SWDscorepad data-tab="Ludio II" name={playerTwo} showAgora={agora} showPantheon={pantheon} />
        </SWDtabs>
      </div>
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
