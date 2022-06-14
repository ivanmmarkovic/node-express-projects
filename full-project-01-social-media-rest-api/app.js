const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const postRouter = require('./routes/Post');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, () => console.log('Connected to mongo'));


// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


app.listen(5000, () => console.log('Listening on port 5000'));