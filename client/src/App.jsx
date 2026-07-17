import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Stats from './components/Stats'
import logoIcon from './assets/pomolo-cropped.png'

function App() {
  const [count, setCount] = useState(0)

  const [numPomos, setNumPomos] = useState(0);
  const [numShort, setNumShort] = useState(0);
  const [numLong, setNumLong] = useState(0);

  const [showStats, setShowStats] = useState(false);

  return (
    <div className='app'>
      <main>
        <div className='top-container'>
          <div>
            <button className='logo'>
              <img src={logoIcon} alt="Pomolo" width="60%" onClick={() => window.location.reload()}></img>
            </button>
          </div>

          <div className='nav-bar'>
            <button onClick={() => setShowStats(true)}>Stats</button>
            <button>Settings</button>
            <button>Profile</button>
          </div>
        </div>

        <Timer 
          numPomos={numPomos}
          onPomoComplete={() => setNumPomos(prev => prev + 1)}
          onShortComplete={() => setNumShort(prev => prev + 1)}
          onLongComplete={() => setNumLong(prev => prev + 1)}
        />

        {showStats && (<Stats 
          onClose={() => setShowStats(false)}
          numPomos={numPomos}
          numShort={numShort}
          numLong={numLong}
        />)}


      </main>

      
      <footer>
        <a href="https://www.flaticon.com/free-icons/pomelo" title="pomelo icons">Pomelo icons created by popo2021 - Flaticon</a>
      </footer>
    </div>
  )
}

export default App
