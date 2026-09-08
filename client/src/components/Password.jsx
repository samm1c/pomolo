import { useState } from 'react'
import closeIcon from '../assets/x-icon-lg.png'
import showPasswordIcon from '../assets/show-password.png'
import axios from 'axios';

function Password({ onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConPassword, setShowConPassword] = useState(false);
    const [error, setError] = useState('');

    const handlePassword = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (newPassword !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            const res = await axios.put('http://localhost:5000/api/users/password', { currentPassword, newPassword }, {  withCredentials: true });

            console.log('Password update successful!');
            setError('');
            onClose();
        } catch (err) {
            console.error('Password update failed: ', err);
            setError(err.response?.data?.message || 'Unable to change password.');
        }
    };

    return (
        <div className='overlay' onMouseDown={e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className='password-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Edit Password</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>

                <form onSubmit={handlePassword}>
                    <div className='overlay-subheading'>Current Password <span className='required'>*</span></div>
                    <div className='password-container'>
                        <input type={showCurrPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                        <img src={showPasswordIcon} width="25px" className='show-button' onClick={() => setShowCurrPassword(prev => !prev)}></img>
                    </div>

                    <div className='overlay-subheading'>New Password <span className='required'>*</span></div>
                    <div className='password-container'>
                        <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        <img src={showPasswordIcon} width="25px" className='show-button' onClick={() => setShowNewPassword(prev => !prev)}></img>
                    </div>
                    <div className='register-description'>must be 8-20 characters and include at least one number and special character</div>

                    <div className='overlay-subheading'>Confirm Password <span className='required'>*</span></div>
                    <div className='password-container'>
                        <input type={showConPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        <img src={showPasswordIcon} width="25px" className='show-button' onClick={() => setShowConPassword(prev => !prev)}></img>
                    </div>

                    {error && (
                        <div className='error'>{error}</div>
                    )}
                    <div><button type="submit" className='register-button'>Update</button></div>
                </form>
            </div>
        </div>
    );
}

export default Password;