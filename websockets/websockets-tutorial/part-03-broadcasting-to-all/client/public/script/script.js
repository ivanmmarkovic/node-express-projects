
const ws = new WebSocket('ws://127.0.0.1:9876');


const text = document.getElementById("text");
const btn = document.getElementById("btn");
const messages = document.getElementById("messages");

ws.onopen = function(){
    //ws.send("Hello");
};

btn.addEventListener('click', sendMessage, false);
ws.addEventListener('message', processMessage, false);


function sendMessage(){
    let message = text.value;
    ws.send(message);
    text.value = '';
    let p = document.createElement('p');
    p.innerText = `Client says ${message}`;
    messages.appendChild(p);
};

function processMessage(e){
    let {data} = e;
    console.log(data);
    let p = document.createElement('p');
    p.innerText = `Server says ${data}`;
    messages.appendChild(p);
};