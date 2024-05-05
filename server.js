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

app.use(express.static('./client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')
)});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
