

# Single server

When connection is through http protocol use express server
When connection is through ws protocol use websocket server


```

// app.listen retuns a server
const server = app.listen(9876);

const wss = new WebSocket.Server({
    server: server
});


```


# verifyClient
- usage is dicouraged

