

const myForm = document.getElementById('myForm');
const myFile = document.getElementById('myFile');
const btn = document.getElementById('btn');


console.log(myForm, myFile, btn);


btn.addEventListener('click', handleUpload);

async function handleUpload(e){
    e.preventDefault();
    let files = myFile.files;

    let formData = new FormData();

    for(let file of files){
        console.log(file.name, file);
        console.log('------------------------');
        formData.append(file.name, file);
    }


    console.log(formData);

    let response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    });

    let json = await response.json();

    console.log(json);

};

