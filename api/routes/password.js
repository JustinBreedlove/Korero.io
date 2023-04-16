var express = require('express');
var router = express.Router();
const getUserInfo = require('../mongoint/getUserInfo');
const {createForgotPasswordOTP, updatePasswordHash} = require('../mongoint/password');
const {resetPassword, checkResetOTP} = require('../mongoint/password');
var {isUsernameSanitary, isOTPSanitary, ispa} = require('../sanitize/sanitize')

router.post('/reset',async function(req, res, next) {

	res.setHeader("x-korrero-error", false)
	const isOTPSafe = isOTPSanitary(req.body.otp)
	const isUsernameSafe = isUsernameSanitary(req.body.username)

	if (!isOTPSafe || !isUsernameSafe || (req.body.password1 !== req.body.password2)) {
		res.setHeader("x-korrero-error", true)
		res.setHeader("x-korrero-otp", isOTPSafe)
		res.setHeader("x-korrero-username", isUsernameSafe)
        res.setHeader("x-korrero-password", (req.body.password1 !== req.body.password2))

		res.send(400)
		return
	}	

    const user = await getUserInfo(req.body.username)

    let otpValidated = await checkResetOTP(req.body.username, Number(req.body.otp), email = user.email, deleteFlag = true)
    let shadow;


    if (otpValidated)
    {
        shadow = await updatePasswordHash( req.body.password1, req.body.username)
    }
    
    res.send(shadow.modifiedCount !== 0 ? 200 : 500)

});

router.post('/user', async function(req, res, next) {
    res.setHeader('x-korrero-error', false)

    const user = await getUserInfo(req.body.username)

    if (Object.keys(user).length == 0)
    {
        res.setHeader('x-korrero-error', true)
        res.send(403)
        return;
    }


    const otpInserted = await createForgotPasswordOTP(req.body.username)

    res.send(otpInserted ? 200 : 500)
});

router.post('/', function(req, res, next) {

    res.send(200)
});


module.exports = router;
