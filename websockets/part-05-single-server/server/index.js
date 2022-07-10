const WebSocket = require('ws');
const express = require('express');
const app = express();
const ejs = require('ejs');


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    res.render('index');
});


// app.listen retuns a server
const server = app.listen(9876);

const wss = new WebSocket.Server({
    server: server
});


wss.on('connection', function(ws){
    ws.on('message', function(data){
        wss.clients.forEach(
            function each(client){
                if(client.readyState == WebSocket.OPEN){
                    client.send(data.toString());
                }
            }
        )
    })
});