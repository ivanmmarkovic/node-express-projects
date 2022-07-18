
const messages = document.getElementById('messages');
const text = document.getElementById('text');
const btn = document.getElementById('btn');


const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', data => {
    console.log(data);
    let p = document.createElement('p');
    p.textContent = data.data;
    messages.appendChild(p);
});

btn.addEventListener('click', handleSendMessage);


function handleSendMessage(){
    let message = text.value;
    ws.send(message);
    text.value = '';
}