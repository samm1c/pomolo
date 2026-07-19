import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Stats from './components/Stats'
import logoIcon from './assets/pomolo-logo.svg'
import statsIcon from './assets/bar-chart.png'
import settingIcon from './assets/cog.png'
import profileIcon from './assets/profile.webp'

function App() {
  const [count, setCount] = useState(0)
  const [sessions, setSessions] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const addSession = (type, duration) => {
    const newSession = {
      type: type,
      duration: duration,
      completedAt: new Date()
    };
    setSessions(prev => [...prev, newSession]); // append to list
  };

  return (
    <div className='app'>
      <main>
        <div className='top-container'>
          <div>
            <button className='logo'>
              <img src={logoIcon} alt="Pomolo" width="300px" onClick={() => window.location.reload()}></img>
            </button>
          </div>

          <div className='nav-bar'>
            <button onClick={() => setShowStats(true)}>
              <img className='img-button' src={statsIcon}></img>
              Stats
            </button>
            <button>
              <img className='img-button' src={settingIcon}></img>
              Settings
            </button>
            <button>
              <img className='img-button' src={profileIcon}></img>
              Profile
            </button>
          </div>
        </div>

        <Timer 
          sessions={sessions}
          onSessionComplete={addSession}
        />

        {showStats && (<Stats 
          onClose={() => setShowStats(false)}
          sessions={sessions}
        />)}


      </main>

      
      <footer>
        <a href="https://www.flaticon.com/free-icons/pomelo" title="pomelo icons">Pomelo icons created by popo2021 - Flaticon</a>
      </footer>
    </div>
  )
}

export default App
