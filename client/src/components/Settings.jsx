import closeIcon from '../assets/x-icon-lg.png'
import soundIcon from '../assets/sound-icon.webp'

import { playSound } from '../utils/sounds'

function Settings({ onClose, timer, setTimer }) {

    return (
        <div className="overlay" onMouseDown={e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className='settings-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Settings</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>
                
                <div className='overlay-subheading'>Timer (minutes)</div>
                <div className='setting-container'>
                    <div className='setting-subcontainer'>
                        <label>Pomodoro</label>
                        <input type='number' value={timer.pomo} min="1"
                            onChange={e => {
                                const value = Number(e.target.value);

                                if (value >= 1) {
                                    setTimer({
                                        ...timer,
                                        pomo: value
                                    });
                                }
                            }}>
                        </input>
                    </div>
                    
                    <div className='setting-subcontainer'>
                        <label>Short Break</label>
                        <input type='number' value={timer.short} min="0"
                            onChange={e => {
                                const value = Number(e.target.value);

                                setTimer({
                                    ...timer,
                                    short: value
                                });
                            }}>
                        </input>
                    </div>

                    <div className='setting-subcontainer'>
                        <label>Long Break</label>
                        <input type='number' value={timer.long} min="0"
                            onChange={e => {
                                const value = Number(e.target.value);

                                setTimer({
                                    ...timer,
                                    long: value
                                });
                            }}>
                        </input>
                    </div>

                </div>
                
                <div className='setting-row'>
                    <div className='overlay-subheading'>Auto Start Breaks</div>
                    <label className='switch'>
                        <input type='checkbox' checked={timer.autoStartBreak}
                            onChange={e => {
                                setTimer({
                                    ...timer,
                                    autoStartBreak: e.target.checked
                                });
                            }}/> {/* invisible input */}
                        <span className='slider'></span> {/* oval background */}
                    </label>
                </div>
                
                
                <div className='setting-row'>
                    <div className='overlay-subheading'>Auto Start Pomodoros</div>
                    <label className='switch'>
                        <input type='checkbox' checked={timer.autoStartPomo}
                            onChange={e => {
                                setTimer({
                                    ...timer,
                                    autoStartPomo: e.target.checked
                                });
                            }}/> {/* invisible input */}
                        <span className='slider'></span> {/* oval background */}
                    </label>
                </div>


                <div className='setting-row'>
                    <div className='overlay-subheading'>Long Break Intervals</div>
                    <input type='number' value={timer.longInterval} min="0"
                        onChange={e => {
                            const value = Number(e.target.value);

                            setTimer({
                                ...timer,
                                longInterval: value
                            });
                        }}>
                    </input>
                </div>


                <div className='setting-row'>
                    <div className='overlay-subheading'>Themes</div>
                    <div className='color-subcontainer'>
                        <button className={`theme-color ${timer.theme === "green" ? "selected" : ""}`} id='green' onClick={() => setTimer({ ...timer, theme: "green"})}></button>
                        <button className={`theme-color ${timer.theme === "dark" ? "selected" : ""}`} id='dark' onClick={() => setTimer({ ...timer, theme: "dark"})}></button>
                        <button className={`theme-color ${timer.theme === "light" ? "selected" : ""}`} id='light' onClick={() => setTimer({ ...timer, theme: "light"})}></button>
                        <button className={`theme-color ${timer.theme === "blue" ? "selected" : ""}`} id='blue' onClick={() => setTimer({ ...timer, theme: "blue"})}></button>
                        <button className={`theme-color ${timer.theme === "brown" ? "selected" : ""}`} id='brown' onClick={() => setTimer({ ...timer, theme: "brown"})}></button>
                    </div>
                </div>
                
                <div className='setting-row'>
                    <div className='overlay-subheading'>Sound Volume</div>
                    <div className='sound-container'>
                        <select value={timer.sound} onChange={e => { setTimer({ ...timer, sound: e.target.value }); }}>
                            <option value="v1">v1</option>
                            <option value="v2">v2</option>
                            <option value="v3">v3</option>
                            <option value="v4">v4</option>
                        </select>
                        <button className='sound-button' onClick={() => playSound(timer.sound, timer.volume)}>
                            <img src={soundIcon} width="20"></img>
                        </button>                        
                    </div>
                </div>
                <div className='slider-container'>
                    {timer.volume}
                    <input className="sound-slider" type="range" min="0" max="100" value={timer.volume} onChange={e => { setTimer({ ...timer, volume: Number(e.target.value) }) }}></input>
                </div>
            </div>
        </div>
    );
}

export default Settings;