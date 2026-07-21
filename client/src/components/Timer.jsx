import { useState, useEffect } from 'react'
import skipIcon from '../assets/skip-white.svg'

// function Timer({ initialSeconds = 1, shortSeconds = 2, longSeconds = 3 }) { // default is 25 mins = 1500 sec
function Timer({ sessions, onSessionComplete, initialSeconds = 1, shortSeconds = 2, longSeconds = 3 }) { // 1500, 300, 900
    // initialize state
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("pomo");
    
    const numPomos = sessions.filter(session => session.type === "pomo").length;

    useEffect(() => {
        if (!isActive) return;

        // update time
        const interval = setInterval(() => {
            setSeconds(prev => {
                // case when time left hits 0
                if (prev <= 1) {
                    setIsActive(false);
                    return 0;
                }

                // otherwise, keep decrementing time
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        // every time seconds changes, update tab title
        document.title = `${formatTime(seconds)} - Pomolo`;

        // checking if timer has run out yet
        if (seconds === 0) {
            // increment counters
            if (mode === "pomo") {
                onSessionComplete("pomo", initialSeconds);
            } else if (mode === "short") {
                onSessionComplete("short", shortSeconds);
            } else {
                onSessionComplete("long", longSeconds);
            }
            // switch modes
            if (shortSeconds === 0 || longSeconds === 0 || mode === "short" || mode === "long") {
                setMode("pomo");
                setSeconds(initialSeconds);
            } else if ((numPomos + 1) % 3 === 0) {
                setMode("long");
                setSeconds(longSeconds);
            } else {
                setMode("short");
                setSeconds(shortSeconds);
            }
        }
    }, [seconds]);

    // start/pause button
    const handlePause = () => {
        if (!isActive && seconds === 0) {
            setSeconds(initialSeconds);
            setIsActive(true);
        } else {
            setIsActive(prev => !prev);
        }
    };

    // pomo button
    const handlepomo = () => {
        setMode("pomo");
        setIsActive(false);
        setSeconds(initialSeconds);
    };

    // short break button
    const handleShort = () => {
        setMode("short");
        setIsActive(false);
        setSeconds(shortSeconds);
    };

    // long break button
    const handleLong = () => {
        setMode("long");
        setIsActive(false);
        setSeconds(longSeconds);
    };

    // skip button
    const handleSkip = () => {
        setIsActive(false);
        if (mode === "short" || mode === "long" || shortSeconds === 0 || longSeconds === 0) {
            setMode("pomo");
            setSeconds(initialSeconds);
        } else if ((numPomos + 1) % 3 === 0) {
            setMode("long");
            setSeconds(longSeconds);
        } else {
            setMode("short");
            setSeconds(shortSeconds);
        }
    };

    // convert seconds to minutes
    const formatTime =  (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        const paddedMins = String(mins).padStart(2, '0');
        const paddedSecs = String(secs).padStart(2, '0');

        return `${paddedMins}:${paddedSecs}`;
    };

    return (
        <div className='timer'>
            <div className='mode-buttons-container'>
                {/* reset button */}
                <button className={mode === "pomo" ? "mode-button active" : "mode-button"} onClick={handlepomo}>Pomodoro</button>
                <button className={mode === "short" ? "mode-button active" : "mode-button"} onClick={handleShort}>Short Break</button>
                <button className={mode === "long" ? "mode-button active" : "mode-button"} onClick={handleLong}>Long Break</button>
            </div>

            <div className='time'>{formatTime(seconds)}</div>

            <div className='time-buttons'>
                {/* main start button */}
                <button className="start-button" onClick={handlePause}>
                    {isActive ? 'Pause' : 'Start'}
                </button>

                {/* skip button */}
                <button className='skip-button' onClick={handleSkip}>
                    <img src={skipIcon} alt="Reset" width="40" height="40" className='skip-icon'></img>
                </button>
            </div>
        </div>
    );
}

export default Timer;