
### WebSocket
In browser(client side JS) there is a WebSocket function

### WebSocket server 
Create server for websocket.

```

const WebSocket = require('ws');

const wss = WebSocket.Server({
    port: 9876
});

```

When open a http://localhost:9876 in browser, Upgrade required as message.
