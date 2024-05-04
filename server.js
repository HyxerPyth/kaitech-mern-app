const express = require('express');
const app = express();
const signups = require('./signups');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// Use userController to handle user-related endpoints
app.use('/signups', signups);

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
