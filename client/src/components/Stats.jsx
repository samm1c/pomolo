
function Stats({ onClose, numPomos, numShort, numLong }) {
    return (
        <div className="stats-overlay">
            <div className="stats-window">
                <div className="stats-header">
                    <h2>Statistics</h2>
                    <button className="x-button" onClick={onClose}>X</button>
                </div>
                <p>Pomodoros Completed: {numPomos}</p>
                <p>Short Breaks: {numShort}</p>
                <p>Long Breaks: {numLong}</p>
            </div>
        </div>
    );
}

export default Stats;