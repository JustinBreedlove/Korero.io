var mongo = require("./connect");
const crypto = require("crypto");
var {encryptAMessage, getsPublicKey}  = require("../crypto/HashicorpVault");

const createChat = async (user1, user2, msg, sessionid) => {
	// create a unique chatid by hashing the user ids using SHA-256
	const chatid = crypto.createHash("sha256").update(`${user1.userid}${user2.userid}`).digest("hex");

	const database = mongo.db("korrero");
	const messages = database.collection("messages");

	// check if chat already exists in the database
	const chat = await messages.findOne({ chatid: chatid });

	// if the chat does not exist, create it
	if (chat == null) {
	    const users = database.collection("users");

		// add chat to user1's chats array
        users.findOneAndUpdate(
            { userid: user1.userid },
            {
                $push: {
                    chats: chatid
                }
            }
        );
		
		// add chat to user2's chats array
        users.findOneAndUpdate(
            { userid: user2.userid },
            {
                $push: {
                    chats: chatid
                }
            }
        );
		// gets the message and uses the recipient's (user2) public key to encrypt before sending
		const recipientPublicKey = await getsPublicKey(user2.userid);
		const encryptedMsg = await encryptAMessage(msg,recipientPublicKey);
		
		// insert the first message into the new chat
		messages.insertOne({
			chatid: chatid,
			userid1: user1.userid,
			userid2: user2.userid,
			messages: [
				{
					sender: user1.userid,
					name: user1.name_short, // shortname
					message: encryptedMsg,
					isread: 0,
					ts: Date.now() //newest message
				}
			]
		});
		return chatid;
	}

	// if the chat already exists, return a 400 error
	return chat != null ? 400 : 500
};

module.exports = createChat;
