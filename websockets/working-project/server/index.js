const WebSocket = require('ws');

/*
const wss = new WebSocket.Server({
    port: 9876
}, function(){
    // this function executes when websocket is ready
   
});
*/

const wss = new WebSocket.Server({
    port: 9876
});


// when client connects to server, this message will be sent
wss.on('connection', function(ws){
    ws.send('Hello from the server');
});
