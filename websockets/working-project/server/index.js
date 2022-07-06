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


/*
const clients = [];

wss.on('connection', function(ws){
    //ws.send('Hello from the server');
    clients.push(ws);
    ws.on('message', function(data){
        clients.forEach(client => client.send(data.toString()));
    })
});

*/

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