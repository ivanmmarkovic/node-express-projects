const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;


app.get('/', async (req, res) => {
    console.log('Client connected');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const intervalId = setInterval(() => {
        const date = new Date().toLocaleString();
        res.write(`data: ${date}\n\n`);
    }, 1000);

    // when client close connection, close event
    res.on('close', () => {
        console.log('Client closed connection');
        clearInterval(intervalId);
        res.end();
    });
});


app.listen(PORT, () => {`Server running on port ${PORT}`});
