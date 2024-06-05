const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/getresponse', async (req, res) => {

    try {
        const userData = req.body;

        const response = await axios.post('https://b83f-162-245-68-145.ngrok-free.app/get-response', userData, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
