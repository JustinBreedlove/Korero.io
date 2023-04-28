// Importing the required dependencies
var mongo = require("./connect");
var {encryptAMessage, getsPublicKey}  = require("../crypto/HashicorpVault");

// Defining the function for updating messages
const uploadPfp = async (userid, b64) => {
	const database = mongo.db("korrero");
	const users = database.collection("users");


    const updatedPfp = users.findOneAndUpdate(
        { userid: userid },
        {
			$set: {
				user_pfp: b64
			}
		}
    );
    // Returning 'true' if the update was successful
    return updatedPfp != null
	// Returning 'false' if the chat does not exist
	return false;
};

module.exports = uploadPfp;
