const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/getaudioresponse', async (req, res) => {

    try {
        const userData = req.body;

        const response = await axios.post('https://b83f-162-245-68-145.ngrok-free.app/get-response-audio', userData, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            res.status(response.status).json(response.data);
        });
        
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
