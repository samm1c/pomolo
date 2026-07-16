import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import logoIcon from './assets/pomolo-cropped.png'

function App() {
  const [count, setCount] = useState(0)

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
            <button>Stats</button>
            <button>Settings</button>
            <button>Profile</button>
          </div>        
        </div>

        <Timer></Timer>
      </main>

      
      <footer>
        <a href="https://www.flaticon.com/free-icons/pomelo" title="pomelo icons">Pomelo icons created by popo2021 - Flaticon</a>
      </footer>
    </div>
  )
}

export default App
