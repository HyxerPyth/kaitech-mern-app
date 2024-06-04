const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/getaudioresponse', async (req, res) => {

    try {
        const userData = req.body;

        const response = await axios.post('https://69ff-2605-ad80-a1-109a-27c1-ad7c-cbfa-1aea.ngrok-free.app/get-response', userData, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
