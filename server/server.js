
const express = require('express');
const fs = require('fs'); // Import the 'fs' module
const app = express();
var cors = require('cors');
const port = 3000;

app.use(cors(), express.static('public'));

app.get('/hello', (req, res) => {
    res.send("hello World");
});

app.get('/budget', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
            // Parse the JSON data
            const budgetData = JSON.parse(data);
            res.json(budgetData);
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
