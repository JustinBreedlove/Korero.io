// Importing the required dependencies
var mongo = require("./connect");
var {encryptAMessage, getsPublicKey}  = require("../crypto/HashicorpVault");

// Defining the function for updating messages
const updateMessages = async (chatid, sender, msg) => {
	const database = mongo.db("korrero");
	const messages = database.collection("messages");

	// Checking if the chat exists in the 'messages' collection
	const chat = await messages.findOne({ chatid: chatid });
	
// If the chat exists, updating the chat with the new message
	if (chat != null) {
		// Getting the messages array from the chat object
		const m = chat.messages;

		//getting the users ID's 
		const userid1 = chat.userid1;
  		const userid2 = chat.userid2;

		// Checking if the sender is user1 or user2
		const recipientUserId = sender.userid === userid1 ? userid2 : userid1;

		// Encrypting the message using the recipient's public key
		const recipientPublicKey = await getsPublicKey(recipientUserId);
		const encryptedMsg = await encryptAMessage(msg, recipientPublicKey);
		// Updating the messages array with the new message
		const updatedMessage = messages.findOneAndUpdate(
			{ chatid: chatid },
			{
				"$push": {
					"messages": {
                        "$each" : [{
                            sender: sender.userid,
                            name: sender.name_short, // shortname
                            message:  encryptedMsg,
                            isread: 0,
                            ts: Date.now()
                        }],
                        "$position": 0
                    }
				}
			}
		);
		// Returning 'true' if the update was successful
		return updatedMessage != null
	}
	// Returning 'false' if the chat does not exist
	return false;
};

module.exports = updateMessages;
