const express = require('express');
const app = express();
app.use(express.static('public'));

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const UserModel = require('./models/User');


const expressSession = require('express-session');
app.use(expressSession({
    secret: 'secret',
    resave: true
}))

const bcyrpt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require('ejs');
app.set('view engine', 'ejs');

global.logged = null;
app.use('*', async (req, res, next) => {
    // logged = req.session.userId;
    res.locals.logged = req.session.userId;
    next();
});

app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Index'});
});

app.get('/create', async (req, res, next) => {
    res.render('create', {title: 'Create'});
});

app.post('/create', async (req, res, next) => {
    let body = {...req.body};
    body.password = await bcrypt.hash(body.password, 5);
    let user = await UserModel.create({...body});
    req.session.userId = user._id;
    res.redirect('/');
});

app.get('/login', async (req, res, next) => {
    res.render('login', {title: 'Login'});
});

app.post('/login', async (req, res, next) => {
    let {username, email, password} = {...req.body};
    let user = await UserModel.findOne({username});
    let matches = await bcrypt.compare(password, user.password);
    if(matches){
        req.session.userId = user._id;
        res.redirect('/');
    }
    else
        res.render('login', {title: 'Login'});
});


app.get('/public', async (req, res, next) => {
    res.render('public', {title: 'Public'});
});

app.get('/private', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else
        res.render('private', {title: 'Private'});
});


app.get('/logout', async (req, res, next) => {
    req.session.destroy(() => res.redirect('/'));
});

app.use('*', async (req, res) => res.render('404', {'title': '404'}));
app.listen(5000, () => console.log('Listen on port 5000'));