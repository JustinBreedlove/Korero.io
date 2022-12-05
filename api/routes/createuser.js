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
/* GET users listing. */
router.get("/", async function (req, res, next) {
	res.setHeader("x-korrero-error", false)

	const doesUserExist = await userExists(req.headers);
	const isPhoneSafe = isPhoneSanitary(`${req.headers["x-korrero-phone"]}`)
	const isEmailSafe = isEmailSanitary(req.headers["x-korrero-email"])
	const isCarrierValid = (carrierDomains[req.headers["x-korrero-carrier"]] != null)
	
	var otp = Math.floor(Math.random() * 10 ** 6);
  
  while (otp < 100000) {
		otp = Math.floor(Math.random() * 10 ** 6);
	}
	
  if (!isPhoneSafe || !isEmailSafe || doesUserExist || !isCarrierValid) {
		res.setHeader("x-korrero-error", true)

		res.setHeader("x-korrero-error-phone", isPhoneSafe)
		res.setHeader("x-korrero-error-email", isEmailSafe)
		res.setHeader("x-korrero-error-existing-user", doesUserExist)
		res.setHeader("x-korrero-error-carrier", isCarrierValid)

		res.send(400);
		return;
	}

	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${req.headers["x-korrero-2fa-method"] == "email" ? req.headers["x-korrero-email"] : req.headers["x-korrero-phone"] + `@${carrierDomains[req.headers["x-korrero-carrier"]]}`}`);
	

	
	const succesfulInsert = await insertUnvalidatedUser(req.headers, otp);

	res.send(succesfulInsert ? 200 : 500);
});

router.get("/checkotp", async function (req, res, next) {
	res.setHeader("x-korrero-error", false)
	const isOTPSafe = isOTPSanitary(req.headers['x-korrero-otp'])
	const isUsernameSafe = isUsernameSanitary(req.headers['x-korrero-username'])
  
	if (!isOTPSafe || !isUsernameSafe) {
		res.setHeader("x-korrero-error", true)
		res.setHeader("x-korrero-otp", isOTPSafe)
		res.setHeader("x-korrero-username", isUsernameSafe)

		res.send(400)
		return
	}	

	const validated = await validateUser(req.headers)


	res.send(validated ? 200 : 500)
});

module.exports = router;
