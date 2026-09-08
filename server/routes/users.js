const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

router.post('/profile-photo', upload.single('profilePhoto'), async (req, res) => {
    try {
        console.log(req.file);
        // check authentication
        if (!req.session.userId) {
            return res.status(401).json({
                message: 'You must be logged in. '
            });
        }
        // check for file
        if (!req.file) {
            return res.status(400).json({
                message: 'No image was uploaded.'
            });
        }
        // find user
        const user = await User.findById(req.session.userId);
        if (!user) { 
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        // upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder: 'pomolo/profile-photos' },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                )
                .end(req.file.buffer);
        });

        // save Cloudinary URL to MongoDB
        user.profilePhoto = result.secure_url;
        await user.save();

        return res.status(200).json({
            message: 'Profile photo updated.',
            profilePhoto: result.secure_url
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Server error.'
        });
    } 
});

router.put('/profile', async (req, res) => {
    try {
        // check cookie
        if (!req.session.userId) {
            return res.status(401).json({
                message: 'You must be logged in.'
            });
        }
        
        // validate values
        const { username, email } = req.body;
        if (!username) {
            return res.status(400).json({
                message: 'Username is required.'
            });
        }
        if (!email) {
            return res.status(400).json({
                message: 'Email is required.'
            });
        }

        // get User object
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        // varidate values (continued)
        if (username.length < 3) {
            return res.status(400).json({
                message: 'Username must be at least 3 characters long.'
            });
        }
        if (username.length > 20) {
            return res.status(400).json({
                message: 'Username exceeds 20 characters.'
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please enter a valid email address.'
            });
        }

        // search database if username already used
        if (user.username !== username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({
                    message: 'Username already in use.'
                });
            }            
        }

        // search database if email already used
        if (user.email !== email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Email already in use.'
                });
            }            
        }

        // update user values
        user.username = username;
        user.email = email;
        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully.',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (err) {
        console.error('Profile updated failed: ', err);
        return res.status(500).json({
            message: 'Server error.'
        });
    }
});

router.put('/password', async (req, res) => {
    try {
        // check cookie
        if (!req.session.userId) {
            return res.status(401).json({
                message: 'You must be logged in.'
            });
        }

        // parse passwords
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Please fill in all fields.'
            });
        }

        // find User object
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        // match password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Current password is incorrect.'
            });
        }

        // check new password
        if (newPassword.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long.'
            });
        }
        if (newPassword.length > 20) {
            return res.status(400).json({
                message: 'Password exceeds 20 characters.'
            });
        }
        if (!/\d/.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must contain at least one number.'
            });
        }
        if (!/[!@#$%^&*]/.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must contain at least one special character (!, @, #, $, $, %, ^, &, or *).'
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // save password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully.'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Server error.'
        });
    }
});

module.exports = router;