var mongo = require("./connect");
var exec = require("child_process").exec;
var crypto = require("crypto");


module.exports.checkResetOTP = async (username, otp, email = null, deleteFlag = false) => {
	if (username == "undefined") {
		return false;
	}
    otp = Number(otp)
	const database = mongo.db("korrero");
	const forgot_passwords = database.collection("forgot_passwords");

	const forgot = await forgot_passwords.findOne({
		username: username
	});

    if(!email)
    {
	    exec(`echo ${"Your Korero password has been reset."}  | mail -s "Korero Password" ${email}`);
    }
    if(deleteFlag)
    {
        await forgot_passwords.findOneAndDelete({
            username: username
        });
    }

	return forgot.otp === otp;
};

module.exports.createForgotPasswordOTP = async (username) => {
	if (username == "undefined") {
		return false;
	}

	const database = mongo.db("korrero");
	const users = database.collection("users");
	const forgot_passwords = database.collection("forgot_passwords");

	const user = await users.findOne({ username: username });

	var otp = Math.floor(Math.random() * 10 ** 6);

	while (otp < 100000) {
		otp = Math.floor(Math.random() * 10 ** 6);
	}


	exec(`echo ${otp}  | mail -s "Your Authentication Code" ${user.email}`);

	const updateOTP = await forgot_passwords.updateOne(
		{ userid: user.userid },
		{
			$set: { otp: otp }
		}
	);
    
	let newOTP;
	if (updateOTP.modifiedCount === 0) {
		newOTP = await forgot_passwords.insertOne({
			userid: user.userid,
			username: username,
			otp: otp
		});
	}

	return newOTP || updateOTP;
};

module.exports.insertPasswordHash = async (password, username) => {
	const salt = Math.floor(Math.random() * 10 ** 8);
	const hashedpassword = crypto.createHash("sha256").update(`${password}${salt}`).digest("hex");

	const database = mongo.db("korrero");
	const shadow = database.collection("shadow");
	const shadowEntry = await shadow.insertOne({
		username: `${username}`,
		hash: hashedpassword,
		salt: salt
	});
	return shadowEntry;
};

module.exports.updatePasswordHash = async (password, username) => {
	const salt = Math.floor(Math.random() * 10 ** 8);
	const hashedpassword = crypto.createHash("sha256").update(`${password}${salt}`).digest("hex");

	const database = mongo.db("korrero");
	const shadow = database.collection("shadow");
	const shadowEntry = await shadow.updateOne(
		{
			username: `${username}`
		},
		{
			$set: {
				hash: hashedpassword,
				salt: salt
			}
		}
	);
	return shadowEntry;
};
