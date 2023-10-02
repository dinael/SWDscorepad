
import Router from './router/Router'

import { GameProvider } from '@/providers/GameContext'

import SWDheader from '@/components/SWDheader/SWDheader'
import SWDfooter from '@/components/SWDfooter/SWDfooter'

function App() {

  return (
    <>
      <SWDheader />
      <main className="App">
        <GameProvider>
          <Router />
        </GameProvider>
      </main>
      <SWDfooter />
    </>
  )
}

export default App
