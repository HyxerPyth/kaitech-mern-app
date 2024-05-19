const express = require('express');
const app = express();
const signups = require('./signups');
const path = require('path');

app.use(express.json());

// Production script 

const staticFilesPath = path.join(__dirname, 'client', 'build');

app.use(express.static(staticFilesPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});

app.use('/signups', signups);


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});