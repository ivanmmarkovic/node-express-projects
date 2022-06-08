const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, () => console.log('Connected to mongo'));


// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.get('/', async (req, res, next) => {
    return res.status(200).json({message: 'Hello'})
});



app.listen(5000, () => console.log('Listening on port 5000'));