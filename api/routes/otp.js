var express = require('express');
var router = express.Router();

const {checkResetOTP} = require("../mongoint/password")

router.get('/', function(req, res, next) {
    res.send(200)
});


router.post('/checkreset', async function(req, res, next) {
    let otpValid = await checkResetOTP(req.body.username, req.body.otp) 
    res.send(otpValid ? 200 : 403)
});

module.exports = router;
