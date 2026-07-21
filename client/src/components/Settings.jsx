import closeIcon from '../assets/x-icon-lg.png'

function Settings({ onClose }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div className='settings-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Settings</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>
                
                old settings to keep: theme, change timer times, automatically start pomos, long break intervals, sound

                new suggested settings: 
            </div>
        </div>
    );
}

export default Settings;