
### WebSocket
In browser(client side JS) there is a WebSocket function

### WebSocket server 
Create server for websocket.

```

const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 9876
});

```

When open a http://localhost:9876 in browser, Upgrade required as message.

### Connecting client with websocket server

```
/*
ws - websocket connection
wss - secure
*/

const ws = new WebSocket('ws://127.0.0.1:9876')

/*
path is not important, connection will be established
const ws = new WebSocket('ws://127.0.0.1:9876/abcd/efgh')
*/

```
