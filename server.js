const express = require('express');
const app = express();
const signups = require('./signups');
const authRouter = require('./oauth')
const requestRouter = require('./request')

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// google Sign in 

app.use('/oauth', authRouter)
app.use('/request', requestRouter)

// Use userController to handle user-related endpoints
app.use('/signups', signups);

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
