import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Stats from './components/Stats'
import logoIcon from './assets/pomolo-cropped.png'

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
