// import node modules
const path = require('path');
const express = require('express');
const { Worker, workerData } = require('worker_threads');

// initializations
const app = express();

// settings
app.set('port', 3000);

// routes
app.get('/prime', (req, res) => {

    const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: parseInt(req.query.numero)});

    worker.on("message", (event) => {
        res.send(event);
    });

    worker.on("error", (error) => {
        console.log(error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));          
        }
    });     
});

// start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});