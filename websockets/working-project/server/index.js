const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 9876
}, function(){
    // this function executes when websocket is ready

});


