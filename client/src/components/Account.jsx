
import closeIcon from '../assets/x-icon-lg.png'

function Account({ onClose }) {

    return (
        <div className='overlay' onMouseDown={e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className='account-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Account</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>


            </div>
        </div>
    );
}

export default Account;