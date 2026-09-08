import { useState } from 'react'

import closeIcon from '../assets/x-icon-lg.png'
import showPasswordIcon from '../assets/show-password.png'

import axios from 'axios';

function Register({ onClose, setActiveModal }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        general: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });

            console.log('Registration successful!');
            onClose();
        } catch (err) {
            console.error('Registration failed: ', err);
            if (err.response) {
                const { field, message } = err.response.data;
                setErrors(prev => ({
                    ...prev,
                    [field]: message
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: 'Unable to connect to server.'
                }))
            }
        }
    };

    return (
        <div className='overlay' onMouseDown={e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className='register-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Sign In</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>

                <form onSubmit={handleRegister}>
                    <div className='overlay-subheading'>Username <span className='required'>*</span></div>
                    {errors.username && (
                        <div className='error'>{errors.username}</div>
                    )}
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className='register-description'>must be 3-20 characters and unique</div>

                    <div className='overlay-subheading'>Email <span className='required'>*</span></div>
                    {errors.email && (
                        <div className='error'>{errors.email}</div>
                    )}
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <div className='overlay-subheading'>Password <span className='required'>*</span></div>
                    {errors.password && (
                        <div className='error'>{errors.password}</div>
                    )}
                    <div className='password-container'>
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                        <img src={showPasswordIcon} width="25px" className='show-button' onClick={() => setShowPassword(prev => !prev)}></img>
                    </div>
                    <div className='register-description'>must be 8-20 characters and include at least one number and special character</div>

                    {errors.general && (
                        <div className='error'>{errors.general}</div>
                    )}
                    <div><button type="submit" className='register-button'>Register</button></div>
                </form>

                <div>
                    Already have an account? <button className='login-link-button' onClick={() => setActiveModal('login')}>Log in</button>
                </div>

            </div>
        </div>
    );
}

export default Register;