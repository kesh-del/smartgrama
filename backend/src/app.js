require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const Issue = require('./models/issue');
const User = require('./models/user');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Sync DB
sequelize.sync().then(() => console.log('Database synced'));

// Routes
app.get('/api/issues', async (req, res) => {
    const issues = await Issue.findAll();
    res.json(issues);
});

app.post('/api/issues', async (req, res) => {
    const issue = await Issue.create(req.body);
    res.status(201).json(issue);
});

app.use('/api/auth', authRoutes);

// Add more routes as needed

module.exports = app; 