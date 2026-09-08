import { useState } from 'react'

import closeIcon from '../assets/x-icon-lg.png'
import showPasswordIcon from '../assets/show-password.png'

import axios from 'axios';

function Login({ onClose, setActiveModal, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        general: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            }, { withCredentials: true });

            console.log('Login successful!');
            setUser(res.data.user);
            onClose();
        } catch (err) {
            console.error('Login failed: ', err);
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
            <div className='login-window' onClick={e => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Login</h2>
                    <button className="x-button" onClick={onClose}>
                        <img src={closeIcon} width="30"></img>
                    </button>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className='overlay-subheading'>Username <span className='required'>*</span></div>
                    {errors.username && (
                        <div className='error'>{errors.username}</div>
                    )}
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>

                    <div className='overlay-subheading'>Password <span className='required'>*</span></div>
                    {errors.password && (
                        <div className='error'>{errors.password}</div>
                    )}
                    <div className='password-container'>
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                        <img src={showPasswordIcon} width="25px" className='show-button' onClick={() => setShowPassword(prev => !prev)}></img>
                    </div>


                    {errors.general && (
                        <div className='error'>{errors.general}</div>
                    )}
                    <div><button type="submit" className='login-button'>Login</button></div>
                </form>

                <div>
                    New here? Create an account: <button className='login-link-button' onClick={() => setActiveModal('register')}>Sign in</button>
                </div>


            </div>
        </div>
    );
}

export default Login;