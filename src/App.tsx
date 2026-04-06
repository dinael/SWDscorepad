import { GameProvider } from "./context/GameContext";
import Router from "./router/Router";
import SWDheader from "./components/SWDheader/SWDheader";
import SWDfooter from "./components/SWDfooter/SWDfooter";

function App() {
  return (
    <GameProvider>
      <SWDheader />
      <main className="App">
        <Router />
      </main>
      <SWDfooter />
    </GameProvider>
  );
}

export default App;
