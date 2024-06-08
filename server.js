const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const dogRouter = require('./routes/dog.route');
const catRouter = require('./routes/cat.route');
const birdRouter = require('./routes/bird.route');

app.use('/dogs', dogRouter);
app.use('/cats', catRouter);
app.use('/birds', birdRouter);

// MongoDB Connection
mongoose.connect('mongodb+srv://root:root@codevider-fullstack.ht2s86s.mongodb.net/?retryWrites=true&w=majority&appName=Codevider-Fullstack', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
