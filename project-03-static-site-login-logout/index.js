const express = require('express');
const app = express();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const UserModel = require('./models/User');

const bcyrpt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Index'});
});

app.get('/create', async (req, res, next) => {
    res.render('create', {title: 'Create'});
});

app.post('/create', async (req, res, next) => {
    let body = {...req.body};
    body.password = await bcyrpt.hash(body.password, 5);
    let user = await UserModel.create({...body});
    res.render('index', {title: 'Index'});
});

app.get('/login', async (req, res, next) => {
    res.render('login', {title: 'Login'});
});

app.post('/login', async (req, res, next) => {
    let {username, email, password} = {...req.body};
    let user = await UserModel.findOne({username});
    let matches = await bcyrpt.compare(password, user.password);
    if(matches)
        res.render('index', {title: 'Index'});
    else
        res.render('login', {title: 'Login'});
});


app.get('/public', async (req, res, next) => {
    res.render('public', {title: 'Public'});
});

app.get('/private', async (req, res, next) => {
    res.render('private', {title: 'Private'});
});


app.use('*', async (req, res) => res.render('404', {'title': '404'}));

app.listen(5000, () => console.log('Listen on port 5000'));