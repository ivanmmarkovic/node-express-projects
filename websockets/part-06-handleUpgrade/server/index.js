const WebSocket = require('ws');
const express = require('express');
const app = express();
const ejs = require('ejs');


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    res.render('index');
});


// app.listen returns a server
const server = app.listen(9876);

const wss = new WebSocket.Server({
    noServer: true
});


wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        wss.clients.forEach(
            function each(client) {
                if (client.readyState == WebSocket.OPEN) {
                    client.send(data.toString());
                }
            }
        )
    })
});


server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    authenticate(request, function next(err, client) {
        if (err || !client) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request, client);
        });
    });
});