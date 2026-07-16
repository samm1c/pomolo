import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='top-container'>
        <div className='logo'>Pomolo</div>

        <div className='nav-bar'>
          <button>Stats</button>
          <button>Settings</button>
          <button>Profile</button>
        </div>        
      </div>

      <Timer></Timer>
      
    </>
  )
}

export default App
