
const messages = document.getElementById('messages');
const text = document.getElementById('text');
const btn = document.getElementById('btn');


const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', data => {
    if(data.data == 'Someone is typing ...'){
        let span = document.querySelector('span');
        span.textContent = data.data;
        setTimeout(() => span.textContent = '', 1000);
        return;
    }

    console.log(data);
    let p = document.createElement('p');
    p.textContent = data.data;
    messages.appendChild(p);
    
});

btn.addEventListener('click', handleSendMessage);
text.addEventListener('keyup', handleKeyup);


function handleKeyup(){
    ws.send('Someone is typing ...');
}

function handleSendMessage(){
    let message = text.value;
    ws.send(message);
    text.value = '';
}