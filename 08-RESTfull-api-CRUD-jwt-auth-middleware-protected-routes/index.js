const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@localhost:27017/photobook?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

global.jwtKey = "secret";
global.jwtExpires = 24 * 60 * 60 * 1000;

app.use(express.json());

const UserModel = require('./models/User');
const UserController = require('./controllers/UserController');

const auth = require('./middlewares/Auth');

app.post('/login', UserController.login);

app.post('/users', UserController.createUser);

app.get('/users', UserController.getUsers);

app.get('/users/:id', UserController.getUserById);

app.put('/users/:id', auth, UserController.updateUser);

app.delete('/users/:id', auth, UserController.deleteUser);


app.listen(3000, () => console.log('App is listening on port 3000'));