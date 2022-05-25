const express = require('express');
const app = express();


app.get("/", async (req, res, next) => {
    res.json({
        message: "Hi"
    })
});

app.listen(5000);

