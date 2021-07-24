

const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
dotenv.config();

const server = express();




server.get('/', (req, res)=> {
    const htmlPath = path.join(__dirname, '/../index.html')
    res.sendFile(htmlPath);
    res.write
})

server.get('/authorize', (req, res) => {
    console.log('authorize response code:', req.query.code);


    const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;

    const header = {'content-type' : 'application/x-www-form-urlencoded'}
    const payload = {
        'grant_type': 'authorization_code',
        'client_id': process.env.CLIENT_ID,
        'code_verifier': codeVerifier,
        'code': req.query.code,
        'redirect_uri': process.env.REDIRECT_URI

    }

    axios.post(url, payload, {header})
    .then(res => {
        console.log('access token response', res.data);
        
    });


    res.send('Logged in');
})

server.get('/login', (req, res) => {
    res.redirect(getLoginUrl());
}) 

let codeVerifier;

function getLoginUrl() {

    const clientId = process.env.CLIENT_ID;
    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
    const redirectUri = process.env.REDIRECT_URI;
    codeVerifier = base64Encode(crypto.randomBytes(32));

    console.log('codeVerifier:', codeVerifier);

    const codeChallenge = base64Encode(crypto.createHash('sha256').update(codeVerifier).digest());
    console.log('codeChallenge:', codeChallenge);

    const loginUrl = `https://${AUTH0_DOMAIN}/authorize?`
    + `response_type=code&client_id=${clientId}` + 
    `&code_challenge=${codeChallenge}` + 
    `&code_challenge_method=S256&redirect_uri=${redirectUri}remove` + 
    `&scope=appointments%20contacts&`
    return loginUrl;
}


function base64Encode(str) {
    return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}


server.listen(3000, () => {console.log('server started at 3000')});


