const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRouter');
const authRouter = require('./routes/AuthRouter');
const authMiddleware = require('./middleware/AuthMiddleware');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

global.jwtKey = "secret";
global.jwtExpires = 24 * 60 * 60 * 1000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', userRouter);
app.use('/', authRouter);

app.get("/public", async (req, res, next) => {
    res.status(200).json({message: "Public page"});
});

app.get("/protected", authMiddleware, async (req, res, next) => {
    // payload is set on req object in authMiddleware
    console.log(req.payload);
    res.status(200).json({message: "Protected page"});
});


app.listen(5000, () => console.log('Listen on port 5000'));