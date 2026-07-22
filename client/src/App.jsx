import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Stats from './components/Stats'
import Settings from './components/Settings'
import logoIcon from './assets/pomolo-logo.svg'
import statsIcon from './assets/bar-chart-white.svg'
import settingIcon from './assets/cog-white.svg'
import profileIcon from './assets/profile-white.svg'

function App() {
  const [count, setCount] = useState(0)
  const [sessions, setSessions] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [timer, setTimer] = useState({
    pomo: 25,
    short: 5,
    long: 15
  });

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
            <button onClick={() => setActiveModal("stats")}>
              <img className='img-button' src={statsIcon}></img>
              Stats
            </button>
            <button onClick={() => setActiveModal("settings")}>
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
          timer={timer}
        />

        {activeModal === "stats" && (<Stats 
          onClose={() => setActiveModal(null)}
          sessions={sessions}
        />)}

        {activeModal === "settings" && (<Settings 
          onClose={() => setActiveModal(null)}
          timer={timer}
          setTimer={setTimer}
        />)}


      </main>

      
      <footer>
        <a href="https://www.flaticon.com/free-icons/pomelo" title="pomelo icons">Pomelo icons created by popo2021 - Flaticon</a>
      </footer>
    </div>
  )
}

export default App
