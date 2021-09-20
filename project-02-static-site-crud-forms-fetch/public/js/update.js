
console.log('Hi');

let hidden = document.getElementById('hidden');
let text = document.getElementById('text');
let textarea = document.getElementById('textarea');
let btn = document.getElementById('btn');

let form = document.forms[0];
form.onsubmit = function(e){
    e.preventDefault();
    return;
}

btn.addEventListener('click', handleClick);

function handleClick(e){
    let id = hidden.value;
    let title = text.value;
    let body = textarea.value;
    let article = {title, body};
    console.log(id);
    fetch(`http://localhost:5000/update/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(article)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.href = 'http://localhost:5000'
    })
    .catch(e => console.log(e));
}