const express = require('express');
const app = express();
const signups = require('./signups');
const path = require('path');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// Use userController to handle user-related endpoints
app.use('/signups', signups);

// Production script 

const staticFilesPath = path.join(__dirname, 'client', 'build');

app.use(express.static(staticFilesPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
