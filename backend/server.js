const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('DB connected');
})

const app = express();
app.use(express.json());
app.use('/api', routes)

const port = process.env.PORT || 4242;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
