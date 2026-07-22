import closeIcon from '../assets/x-icon-lg.png'

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

                                if (value >= 1) {
                                    setTimer({
                                        ...timer,
                                        short: value
                                    });
                                }
                            }}>
                        </input>
                    </div>

                    <div className='setting-subcontainer'>
                        <label>Long Break</label>
                        <input type='number' value={timer.long} min="0"
                            onChange={e => {
                                const value = Number(e.target.value);

                                if (value >= 1) {
                                    setTimer({
                                        ...timer,
                                        long: value
                                    });
                                }
                            }}>
                        </input>
                    </div>
                </div>
                
                <div className='overlay-subheading'>Auto Start Breaks</div>
                <div className='overlay-subheading'>Auto Start Pomodoros</div>
                <div className='overlay-subheading'>Long Break Intervals</div>

                <div className='overlay-subheading'>Themes</div>
                <div className='overlay-subheading'>Sound Volume</div>

                old settings to keep: theme, change timer times, automatically start pomos, long break intervals, sound
                new suggested settings: 
            </div>
        </div>
    );
}

export default Settings;