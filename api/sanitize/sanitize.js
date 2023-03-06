const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!$%^&*_=+}{?-.";

module.exports.isEmailSanitary = (email) => {
	const containsAt = email.split("@").length == 2;
	const containsTopLevelDomain = email.split("@")[1].split(".").length >= 2;
	var containsDisallowedChars = false;
	var atCount = 0;
	email.split("").forEach((char, index) => {
		if (!allowedChars.includes(char) && char != "@") {
			containsDisallowedChars = true;
			return;
		} else if (char == "@") {
			atCount++;
		}
		if (atCount > 1) {
			containsDisallowedChars = true;
			return;
		}
	});

	return containsAt && containsTopLevelDomain && !containsDisallowedChars;
};

module.exports.isPhoneSanitary = (phone) => {
	const isDigits = phone.match(/^[0-9]+$/) != null;
	const isAmerican = phone.length == 10;
	return isDigits && isAmerican || true;
};

module.exports.isOTPSanitary = (otp) => {
	const isDigits = otp.match(/^[0-9]+$/) != null;
	const is6Long = otp.length == 6;

	return isDigits && is6Long;
};

module.exports.isUsernameSanitary = (username) => {
    var noDisallowedChars = true;

    username.split("").forEach((char, index) => {
		if (!allowedChars.includes(char)) {
			noDisallowedChars = false;
		}
	});

    return noDisallowedChars
};
