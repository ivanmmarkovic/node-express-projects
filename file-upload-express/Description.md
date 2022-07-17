

### enctype="multipart/form-data"
- If using fetch, no need for enctype

### FormData
- express expects that format - FormData


### fileExtLimiter
- fileExtLimiter returns closure, keep allowedExtArray 
```
const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files

        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}


app.post('/upload', 
    fileUpload({createParentPath: true}), filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;
        console.log(files);

        return res.json({
            status: 'logged',
            message: 'logged'
        })
    });


/*
fileExtLimiter(['.png', '.jpg', '.jpeg']),
returns function, and that function is a middleware

*/

```



[Link](https://www.youtube.com/watch?v=4pmkQjsKJ-U)