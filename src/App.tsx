
import Router from './router/Router'
import SWDheader from './components/SWDheader/SWDheader'
//import SWDfooter from './components/SWDfooter/SWDfooter'

function App() {

  return (
    <>
      <SWDheader />
      <main className="App">
        <Router />
      </main>
      {/* <SWDfooter /> */}
    </>
  )
}

export default App
