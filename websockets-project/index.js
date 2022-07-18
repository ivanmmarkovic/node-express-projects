const WebSocket = require('ws');

const express = require('express');
const app = express();

const ejs = require('ejs');

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    res.render('index', { title: 'Home' });
});


const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


const wss = new WebSocket.Server({
    noServer: true
});


wss.on('connection', (ws) => {
    ws.send('You\'re connected');

    ws.on('message', function message(data) {
        ws.send(data.toString());
    });
});

server.on('upgrade', function upgrade(request, socket, head) {

    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });

});