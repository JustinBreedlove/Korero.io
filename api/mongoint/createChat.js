var mongo = require("./connect");
const crypto = require("crypto");
const validateSession = require("./validateSession");
const getUserInfo = require("./getUserInfo");

const createChat = async (user1, user2, msg, sessionid) => {



	const chatid = crypto.createHash("sha256").update(`${user1.userid}${user2.userid}`).digest("hex");

	const database = mongo.db("korrero");
	const messages = database.collection("messages");

	const chatroom = await messages.findOne({ chatid: chatid });

    console.log(user1, user2)

	if (chatroom == null) {
		messages.insertOne({
			chatid: chatid,
			userid1: user1.userid,
			userid2: user2.userid,
			messages: [
				{
					sender: user1.userid,
					name: user1.name_short, // shortname
					message: msg,
					isread: 0,
					ts: Date.now() //newest message
				}
			]
		});
		return chatid;
	}
    console.log(chatid)
	return false;
};

module.exports = createChat;
