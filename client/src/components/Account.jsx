import { useState, useRef } from 'react'

import closeIcon from '../assets/x-icon-lg.png'

import axios from 'axios'

import defaultProfilePhoto from '../assets/profile.webp'

function Account({ onClose, user, setUser, setActiveModal }) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePhoto', file);
        try {
            const res = await axios.post('http://localhost:5000/api/users/profile-photo', formData, { withCredentials: true });
            setUser(prev => ({
                ...prev,
                profilePhoto: res.data.profilePhoto
            }));
            setError('');
        } catch (err) {
            console.error('Photo upload failed: ', err);
            setError(err);
        }
    };

    const handleSave = async () => {
        try {
            const res = await axios.put('http://localhost:5000/api/users/profile',  { username, email }, { withCredentials: true });
            setUser(prev => ({
                ...prev,
                username: res.data.user.username,
                email: res.data.user.email
            }));
            setError('');
            onClose();
        } catch (err) {
            console.error('Profile update failed: ', err);
            setError(err.response?.data?.message || 'Unable to update profile.');
        }
    };

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

                <div className='account-body'>
                    <div className='profile-photo-container'>
                        <img src={user.profilePhoto || defaultProfilePhoto}
                            alt="Profile"
                            className='profile-photo'
                            onClick={handlePhotoClick}
                        />

                        <input ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div>
                        <input className='account-username' value={username} type="text" onChange={(e) => setUsername(e.target.value)}></input>
                        <input className='account-email' value={email} type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        {error && (
                            <div className='error'>{error}</div>
                        )}
                    </div>
                </div>
                
                <div className='account-bottom-container'>
                    <button onClick={() => setActiveModal('password')}>Change Password</button>
                    <div className='account-save'>
                        <button className='cancel-button'>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>                    
                </div>


            </div>
        </div>
    );
}

export default Account;