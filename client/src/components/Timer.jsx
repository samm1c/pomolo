import { useState, useEffect } from 'react'
import skipIcon from '../assets/skip.webp'

// function Timer({ initialSeconds = 1, shortSeconds = 2, longSeconds = 3 }) { // default is 25 mins = 1500 sec
function Timer({ initialSeconds = 1500, shortSeconds = 300, longSeconds = 900 }) { // default is 25 mins = 1500 sec
    // initialize state
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("work");
    const [numPomos, setNumPomos] = useState(0);
    const [numShort, setNumShort] = useState(0);
    const [numLong, setNumLong] = useState(0);

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
            if (mode === "work") {
                setNumPomos(prev => prev + 1);
            } else if (mode === "short") {
                setNumShort(prev => prev + 1);
            } else {
                setNumLong(prev => prev + 1);
            }
            // switch modes
            // console.log((numPomos + 1) % 3 === 0);
            // console.log(numPomos + 1);
            if (shortSeconds === 0 || longSeconds === 0 || mode === "short" || mode === "long") {
                setMode("work");
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

    // work button
    const handleWork = () => {
        setMode("work");
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
            setMode("work");
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
                <button className={mode === "work" ? "mode-button active" : "mode-button"} onClick={handleWork}>Pomodoro</button>
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

export default Timer