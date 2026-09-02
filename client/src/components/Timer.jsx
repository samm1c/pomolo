import { useState, useEffect, useRef } from 'react'
import skipIcon from '../assets/skip-white.svg'

import timerSound1 from '../assets/time-notif-1.mp3'
import timerSound2 from '../assets/time-notif-2.mp3'
import timerSound3 from '../assets/time-notif-3.mp3'
import timerSound4 from '../assets/time-notif-4.mp3'
import { playSound } from '../utils/sounds'

function Timer({ sessions, onSessionComplete, settings }) {
    // initialize state
    const [seconds, setSeconds] = useState(settings.pomo * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("pomo");
    
    const numPomos = sessions.filter(session => session.type === "pomo").length;

    useEffect(() => {
        if (mode === 'pomo') {
            setSeconds((settings.pomo * 60) - seconds); // remaining time; don't reset
        } else if (mode === 'short') {
            setSeconds((settings.short * 60) - seconds);
        } else {
            setSeconds((settings.long * 60) - seconds);
        }
    }, [settings]);

    useEffect(() => {
        if (!isActive) return;

        // update time
        const interval = setInterval(() => {
            setSeconds(prev => {
                // case when time left hits 0
                if (prev <= 1) {
                    playSound(settings.sound, settings.volume);
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
                onSessionComplete("pomo", settings.pomo * 60);
            } else if (mode === "short") {
                onSessionComplete("short", settings.short * 60);
            } else {
                onSessionComplete("long", settings.long * 60);
            }
            // switch modes
            if (settings.short * 60 === 0 || settings.long * 60 === 0 || mode === "short" || mode === "long") {
                setMode("pomo");
                setSeconds(settings.pomo * 60);
                setIsActive(settings.autoStartPomo);
            } else if ((numPomos + 1) % settings.longInterval === 0) {
                setMode("long");
                setSeconds(settings.long * 60);
                setIsActive(settings.autoStartBreak);
            } else {
                setMode("short");
                setSeconds(settings.short * 60);
                setIsActive(settings.autoStartBreak);
            }
        }
    }, [seconds]);

    // start/pause button
    const handlePause = () => {
        if (!isActive && seconds === 0) {
            setSeconds(settings.pomo * 60);
            setIsActive(true);
        } else {
            setIsActive(prev => !prev);
        }
    };

    // pomo button
    const handlePomo = () => {
        setMode("pomo");
        setIsActive(false);
        setSeconds(settings.pomo * 60);
    };

    // short break button
    const handleShort = () => {
        setMode("short");
        setIsActive(false);
        setSeconds(settings.short * 60);
    };

    // long break button
    const handleLong = () => {
        setMode("long");
        setIsActive(false);
        setSeconds(settings.long * 60);
    };

    // skip button
    const handleSkip = () => {
        setIsActive(false);
        if (mode === "short" || mode === "long" || settings.short * 60 === 0 || settings.long * 60 === 0) {
            setMode("pomo");
            setSeconds(settings.pomo * 60);
        } else if ((numPomos + 1) % settings.longInterval == 0) {
            setMode("long");
            setSeconds(settings.long * 60);
        } else {
            setMode("short");
            setSeconds(settings.short * 60);
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
                <button className={mode === "pomo" ? "mode-button active" : "mode-button"} onClick={handlePomo}>Pomodoro</button>
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