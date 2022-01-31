const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

global.jwtKey = "secret";
global.jwtExpires = 24 * 60 * 60 * 1000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const UserRouter = require('./routes/User');


app.use("/users", UserRouter);

app.listen(5000, () => console.log('App listens on port 5000'));