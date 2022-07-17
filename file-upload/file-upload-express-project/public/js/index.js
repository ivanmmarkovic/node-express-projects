
const myForm = document.getElementById('myForm');
const myFile = document.getElementById('myFile');
const btn = document.getElementById('btn');

const p = document.querySelector('p');
const span = document.querySelector('span');

btn.addEventListener('click', handleUpload);

async function handleUpload(e){
    e.preventDefault();
    let files = myFile.files;
    let formData = new FormData();

    for(let file of files){
        formData.append(file.name, file);
    }

    try {
        let response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        });
    
        let json = await response.json();
        let {status, message} = json;
        p.textContent = status;
        span.textContent = message;
    } catch (error) {
        let {status, message} = error;
        p.textContent = status;
        span.textContent = message;
    }


};

