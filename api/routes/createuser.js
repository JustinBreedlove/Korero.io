var express = require("express");
var insertUnvalidatedUser = require("../mongoint/insertUnvalidatedUser");
const validateUser = require("../mongoint/validateUser");
var userExists = require("../mongoint/userExists");
var exec = require("child_process").exec;
var {isUsernameSanitary, isOTPSanitary, isEmailSanitary, isPhoneSanitary} = require('../sanitize/sanitize')
var router = express.Router();

const carrierDomains = {
	tmobile: "tmomail.net",
	sprint: "messaging.sprintpcs.com",
	verizon: "vtext.com",
	att: "txt.att.net"
};
/* POST users listing. */
router.get("/", async function (req, res, next) {
	res.send(200)
})

router.post("/", async function (req, res, next) {

	res.setHeader("x-korrero-error", false)

	const doesUserExist = await userExists(req.body);
	const isPhoneSafe = isPhoneSanitary(`${req.body.phone}`)
	const isEmailSafe = isEmailSanitary(req.body.email)
	const isCarrierValid = (carrierDomains[req.body.carrier] != null)
	
	var otp = Math.floor(Math.random() * 10 ** 6);
  
  while (otp < 100000) {
		otp = Math.floor(Math.random() * 10 ** 6);
	}
	
  if (!isPhoneSafe || !isEmailSafe || doesUserExist || !isCarrierValid) {
		res.setHeader("x-korrero-error", true)

		res.setHeader("x-korrero-error-phone", !isPhoneSafe)
		res.setHeader("x-korrero-error-email", !isEmailSafe)
		res.setHeader("x-korrero-error-existing-user", doesUserExist)
		res.setHeader("x-korrero-error-carrier", !isCarrierValid)

		res.send(400);
		return;
	}

	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${req.body.mfa == "email" ? req.body.email : req.body.phone + `@${carrierDomains[req.body.carrier]}`}`);
	

	
	const succesfulInsert = await insertUnvalidatedUser(req.body, otp);

	res.send(succesfulInsert ? 200 : 500);
});

router.post("/checkotp", async function (req, res, next) {
	res.setHeader("x-korrero-error", false)
	const isOTPSafe = isOTPSanitary(req.body.otp)
	const isUsernameSafe = isUsernameSanitary(req.body.username)
  
	if (!isOTPSafe || !isUsernameSafe) {
		res.setHeader("x-korrero-error", true)
		res.setHeader("x-korrero-otp", isOTPSafe)
		res.setHeader("x-korrero-username", isUsernameSafe)

		res.send(400)
		return
	}	

	const validated = await validateUser(req.body)


	res.send(validated ? 200 : 500)
});

module.exports = router;
