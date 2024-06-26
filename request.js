const express = require('express');
const dotenv = require('dotenv');
const router = express.Router()
dotenv.config();
const {OAuth2Client} = require('google-auth-library')



// Google Auth

router.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('Referrer-Policy','no-referrer-when-downgrade');

    const redirectUrl = 'http://127.0.0.1:8080/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID_GOOGLE,
        process.env.CLIENT_SECRET_GOOGLE,
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})
});



module.exports = router ;
