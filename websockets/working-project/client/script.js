
/*
ws - websocket connection
wss - secure
*/

const ws = new WebSocket('ws://127.0.0.1:9876');
ws.send("Hello");