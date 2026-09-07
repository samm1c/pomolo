const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        // parse request
        const { username, email, password } = req.body;

        // check all fields
        if (!username) {
            return res.status(400).json({
                field: 'username',
                message: 'Username is required.'
            });
        }
        if (!email) {
            return res.status(400).json({
                field: 'email',
                message: 'Email is required.'
            });
        }
        if (!password) {
            return res.status(400).json({
                field: 'password',
                message: 'Password is required.'
            });
        }

        // validate values
        if (username.length < 3) {
            return res.status(400).json({
                field: 'username',
                message: 'Username must be at least 3 characters long.'
            });
        }
        if (username.length > 20) {
            return res.status(400).json({
                field: 'username',
                message: 'Username exceeds 20 characters.'
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                field: 'password',
                message: 'Password must be at least 8 characters long.'
            });
        }
        if (password.length > 20) {
            return res.status(400).json({
                field: 'password',
                message: 'Password exceeds 20 characters.'
            });
        }
        if (!/\d/.test(password)) {
            return res.status(400).json({
                field: 'password',
                message: 'Password must contain at least one number.'
            });
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({
                field: 'password',
                message: 'Password must contain at least one special character (!, @, #, $, $, %, ^, &, or *).'
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                field: 'email',
                message: 'Please enter a valid email address.'
            });
        }
        
        // search database if username already used
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                field: 'username',
                message: 'Username already in use.'
            });
        }

        // search database if email already used
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                field: 'email',
                message: 'Email already in use.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error('Register error: ', err);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // check all fields
        if (!username) {
            return res.status(400).json({
                field: 'username',
                message: 'Username is required.'
            });
        }
        if (!password) {
            return res.status(400).json({
                field: 'password',
                message: 'Password is required.'
            });
        }

        // find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                field: 'general',
                message: 'Invalid username or password.'
            });
        }

        // compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                field: 'general',
                message: 'Invalid username or password.'
            });
        }

        // create session/cookie
        req.session.userId = user._id;

        return res.status(200).json({
            message: 'User logged in successfully.',
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error: ', err);
        return res.status(500).json({
            message: 'Server error'
        });
    }

});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => { // server-side delete
        if (err) {
            console.error('Logout error: ', err);
            return res.status(500).json({
                message: 'Unable to log out.'
            });
        }

        res.clearCookie('connect.sid'); // client-side delete (inside browser's cookie jar)

        return res.status(200).json({
            message: 'Logout successful'
        });
    });
});

// check if current browser is logged in
router.get('/me', async (req, res) => {
    try {
        // check if cookie exists
        if (!req.session.userId) {
            return res.status(401).json({
                message: 'Not authenticated.'
            });
        }

        // find user
        const user = await User.findById(req.session.userId).select('-password'); // omit the hashed password in returned object
        if (!user) {
            return res.status(401).json({
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Authentication check failed: ', err);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});

module.exports = router;