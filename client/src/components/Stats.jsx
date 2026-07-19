import closeIcon from '../assets/x-icon-lg.png'

function Stats({ onClose, sessions }) {
    // counter functions
    const numPomos = sessions.filter(session => session.type === "pomo").length;
    const numShort = sessions.filter(session => session.type === "short").length;
    const numLong = sessions.filter(session => session.type === "long").length;
    const totalHours = sessions
        .filter(session => session.type === "pomo")
        .reduce((total, session) => total + session.duration, 0);

    return (
        <div className="stats-overlay" onClick={onClose}>
            <div className="stats-window" onClick={e => e.stopPropagation()}>
                <div className="stats-header">
                    <h2>Statistics</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>
                
                <div className="stat-container">
                    <div className="stat-box">
                        <div className="stat-num">{totalHours.toFixed(2)}</div>
                        <div>hours focused</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">600</div>
                        <div>days focused</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">{numPomos}</div>
                        <div>completed pomos</div>
                    </div>
                </div>
                <p>Short Breaks: {numShort}</p>
                <p>Long Breaks: {numLong}</p>
                <p>GRAPH TO BE IMPLEMENTED</p>
            </div>
        </div>
    );
}

export default Stats;