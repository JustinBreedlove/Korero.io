var express = require("express");
var insertNewUser = require("../mongoint/insertNewUser");
var userExists = require("../mongoint/userExists");
var exec = require("child_process");

var router = express.Router();

const isEmailSanitized = (email) => {
	return true;
};

const isPhoneSanitized = (phone) => {
	return true;
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

	if (isPhoneSanitized(req.headers["x-korrero-phone"]) || isEmailSanitized(req.headers["x-korrero-email"]) /*|| doesUserExist*/ || carrierDomains[req.headers["x-korrero-carrier"]]) {
		res.send(400);
		return;
	}

	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${req.headers["x-korrero-2fa-method"] == "email" ? req.headers["x-korrero-email"] : req.headers["x-korrero-phone"] + `${carrierDomains[carrier]}`}`);

	while (otp < 100000) {
		otp = Math.floor(Math.random() * 10 ** 6);
	}

	insertNewUser(req.headers, otp);
	res.send(`${otp}`);
});

module.exports = router;
