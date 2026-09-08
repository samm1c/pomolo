const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');

const app = express();
const PORT = 5000;

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    }
}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); // express automatically parses JSON body
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Running Pomolo server...');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed: ", error);
    });
// mongoose.connect('mongodb://sc3vvv_db_user:S6RxBB20LUgNLwnh@pomolocluster.8vwn5wt.mongodb.net/?appName=PomoloCluster');