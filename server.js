const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router  = require('./routes/personRoutes')
require("dotenv").config();
app.use(express.json());

// mongodb://localhost:27017/test
// D1HMxB2aX86rEOMf
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const personRoutes = require("./routes/personRoutes");
app.use('/users', personRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('')