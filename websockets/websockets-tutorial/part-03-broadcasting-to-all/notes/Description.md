
### clients are stored in array

```

const clients = [];

wss.on('connection', function(ws){
    //ws.send('Hello from the server');
    clients.push(ws);
    ws.on('message', function(data){
        clients.forEach(client => client.send(data.toString()));
    })
});

```

### no need for array with clients

```

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

```