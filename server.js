const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const app = express();

app.use(express.json());
app.get('/', function(req, res){
    res.send("Welcome to my hotel.. This is your food menu.");
})

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required.');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error code
            return res.status(400).send('Email already exists.');
        }
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
