


console.log('Hi');


const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', data => {
    console.log(data);
});