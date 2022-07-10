

When server receives connection

 - head is first bytes of communication.
 - request will allow to authenticate the user


```javascript

server.on('upgrade', function upgrade(request, socket, head) {
    
    // test for authentication

    // return false;
    /*
    if you return false here, there will be no upgrade
    but connection will not be terminated, we will have pending websocket (01.pending websocket.png, 02.pending websocket connection.png)
    */


    // No connection, proper way to do(03.No connection.png, 04.websocket destroy.png)
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy(); 
    return;
    
    // this handles upgrade
    wss.handleUpgrade(request, socket, head, function done(ws) {
        // socket will emit connection event and handle it in wss.on('connection')
        wss.emit('connection', ws, request, client);
    });

});

```