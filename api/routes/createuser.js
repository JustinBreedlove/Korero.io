var express = require("express");
var insertNewUser = require("../mongoint/insertNewUser");
var userExists = require("../mongoint/userExists");
var exec = require("child_process").exec;

var router = express.Router();

const isEmailSanitized = (email) => {
  var allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!$%^&*_=+}{?-.'
  var containsAt = email.split("@").length == 2
  var containsTopLevelDomain = email.split("@")[1].split(".").length >= 2
  var containsDisallowedChars = false;
  
  email.forEach((char, index) =>
  {
    if (!allowedChars.includes(char)) containsDisallowedChars = true
  })

	return containsAt && containsTopLevelDomain && !containsDisallowedChars;
};

const isPhoneSanitized = (phone) => {
  var isDigits = phone.match(/^[0-9]+$/) != null;
  var isAmerican = phone.length == 10
	return isDigits && isAmerican;
};

const carrierDomains = {
	tmobile: "tmomail.net",
	sprint: "messaging.sprintpcs.com",
	verizon: "vtext.com",
	att: "txt.att.net"
};
/* GET users listing. */
router.get("/", async function (req, res, next) {
	const doesUserExist = await userExists(req.headers);

	var otp = Math.floor(Math.random() * 10 ** 6);
  
  while (otp < 100000) {
		otp = Math.floor(Math.random() * 10 ** 6);
	}
	
  if (!isPhoneSanitized(`${req.headers["x-korrero-phone"]}`) || !isEmailSanitized(req.headers["x-korrero-email"]) /*|| doesUserExist*/ || !carrierDomains[req.headers["x-korrero-carrier"]]) {
		res.send(400);
		return;
	}

	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${req.headers["x-korrero-2fa-method"] == "email" ? req.headers["x-korrero-email"] : req.headers["x-korrero-phone"] + `@${carrierDomains[req.headers["x-korrero-carrier"]]}`}`);
	


	insertNewUser(req.headers, otp);

	res.send(`${otp}`);
});

router.get("/checkotp", async function (req, res, next) {
	
  
  
});

module.exports = router;
