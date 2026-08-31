import { useEffect, useState, useRef } from 'react'
import './App.css'

import Timer from './components/Timer'
import Stats from './components/Stats'
import Settings from './components/Settings'
import Profile from './components/Profile'

import logoIcon from './assets/pomolo-logo.svg'
import logoIconDark from './assets/pomolo-logo-dark.svg'
import statsIcon from './assets/bar-chart-white.svg'
import statsIconDark from './assets/bar-chart.png'
import settingIcon from './assets/cog-white.svg'
import settingIconDark from './assets/cog.png'
import profileIcon from './assets/profile-white.svg'
import profileIconDark from './assets/profile.webp'

function App() {
  const [count, setCount] = useState(0)
  const [sessions, setSessions] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [timer, setTimer] = useState({
    // pomo: 25,
    // short: 5,
    // long: 15,
    pomo: 0.1, // for testing only
    short: 0.1,
    long: 0.1,
    autoStartPomo: false,
    autoStartBreak: false,
    longInterval: 3,
    theme: "green",
    sound: "v1",
    volume: 50,
  });

  const addSession = (type, duration) => {
    const newSession = {
      type: type,
      duration: duration,
      completedAt: new Date()
    };
    setSessions(prev => [...prev, newSession]); // append to list
  };

  // icon mapping (dark, white)
  const icons = {
    green: {
      logo: logoIcon,
      stats: statsIcon,
      settings: settingIcon,
      profile: profileIcon
    },

    dark: {
      logo: logoIcon,
      stats: statsIcon,
      settings: settingIcon,
      profile: profileIcon
    },

    light: {
      logo: logoIconDark,
      stats: statsIconDark,
      settings: settingIconDark,
      profile: profileIconDark
    },

    blue: {
      logo: logoIcon,
      stats: statsIcon,
      settings: settingIcon,
      profile: profileIcon
    },

    brown: {
      logo: logoIcon,
      stats: statsIcon,
      settings: settingIcon,
      profile: profileIcon
    },

  }

  // listener for profile
  const profileRef = useRef(null);

  useEffect(() => {
    if (activeModal !== "profile") return;
    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setActiveModal(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);


  return (
    <div className={`app theme-${timer.theme}`}>
      <main>
        <div className='top-container'>
          <div>
            <button className='logo'>
              <img src={icons[timer.theme].logo} alt="Pomolo" width="300px" onClick={() => window.location.reload()}></img>
            </button>
          </div>

          <div className='nav-bar'>
            <button onClick={() => setActiveModal("stats")}>
              <img className='img-button' src={icons[timer.theme].stats}></img>
              Stats
            </button>
            <button onClick={() => setActiveModal("settings")}>
              <img className='img-button' src={icons[timer.theme].settings}></img>
              Settings
            </button>
            <div className='profile-container' ref={profileRef}>
              <button onClick={() => setActiveModal("profile")}>
                <img className='img-button' src={icons[timer.theme].profile}></img>
                Profile
              </button>
              {activeModal === "profile" && (<Profile 
              />)} 
            </div>
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
        <p><a href="https://www.flaticon.com/free-icons/pomelo" title="pomelo icons">Pomelo icons created by popo2021 - Flaticon</a></p>
        <p><a href="https://pixabay.com/sound-effects/technology-new-notification-044-494239/" title="ringtone">New Notification 044 created by Universfield - Pixabay</a></p>
        <p><a href="https://pixabay.com/sound-effects/technology-new-notification-048-494235/" title="ringtone">New Notification 048 created by Universfield - Pixabay</a></p>
        <p><a href="https://pixabay.com/sound-effects/technology-new-notification-054-494259/" title="ringtone">New Notification 054 created by Universfield - Pixabay</a></p>
        <p><a href="https://pixabay.com/sound-effects/film-special-effects-simple-notification-152054/" title="ringtone">Simple Notification created by Universfield - Pixabay</a></p>
        <p><a href="https://commons.wikimedia.org/wiki/File:Speaker_Icon.svg" title="sound">Sound Icon created by Wikipedia</a></p>
        <p><a href="https://www.svgrepo.com/svg/509905/dropdown-arrow" title="dropdown">Dropdown Icon created by zest - SVG Repo</a></p>

      </footer>
    </div>
  )
}

export default App
