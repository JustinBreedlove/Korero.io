var express = require("express");
const { mongo } = require("../mongoint/connect");
var insertNewUser = require("../mongoint/insertNewUser");
var userExists = require("../mongoint/userExists");
var exec = require("child_process").exec;

var router = express.Router();

const isEmailSanitary = (email) => {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!$%^&*_=+}{?-.'
  const containsAt = (email.split("@").length == 2)
  const containsTopLevelDomain = (email.split("@")[1].split(".").length >= 2)
  var containsDisallowedChars = false;
  
  email.split("").forEach((char, index) =>
  {
    if (!allowedChars.includes(char)) containsDisallowedChars = true
  })

	return containsAt && containsTopLevelDomain && !containsDisallowedChars;
};

const isPhoneSanitary = (phone) => {
  const isDigits = (phone.match(/^[0-9]+$/) != null)
  const isAmerican = (phone.length == 10)
	return isDigits && isAmerican;
};

isOTPSanitary = (otp) =>
{
	const isDigits = (otp.match(/^[0-9]+$/) != null)
	const is6Long = (otp.length == 6)

	return isDigits && is6Long;
}
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
	
  if (!isPhoneSanitary(`${req.headers["x-korrero-phone"]}`) || !isEmailSanitary(req.headers["x-korrero-email"]) /*|| doesUserExist*/ || !carrierDomains[req.headers["x-korrero-carrier"]]) {
		res.send(400);
		return;
	}

	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${req.headers["x-korrero-2fa-method"] == "email" ? req.headers["x-korrero-email"] : req.headers["x-korrero-phone"] + `@${carrierDomains[req.headers["x-korrero-carrier"]]}`}`);
	


	insertNewUser(req.headers, otp);

	res.send(`${otp}`);
});

router.get("/checkotp", async function (req, res, next) {
	const database = mongo.db('korrero')
    const unvalidated_users = database.collection('unvalidated_users')
  
	if (!isOTPSanitary(req.headers['x-korrero-otp'])) {
		res.send(400)
		return
	}	

	console.log(unvalidated_users.findOneAndDelete({"otp" : req.headers['x-korrero-otp']}))

});

module.exports = router;
