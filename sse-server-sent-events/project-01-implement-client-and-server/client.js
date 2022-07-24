

const eventSource = new EventSource('http://localhost:5000');

function updateMessage(message){
    const messages = document.getElementById('messages');
    const p = document.createElement('p');
    p.textContent = message;
    messages.appendChild(p);
};

eventSource.onmessage = function(event){
    updateMessage(event.data);
};

eventSource.onerror = function(){
    updateMessage('Server closed connection');
    eventSource.close();
};
