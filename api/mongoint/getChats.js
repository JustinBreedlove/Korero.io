var mongo = require("./connect");
var crypto = require("crypto");
const createSession = async (userid) => {
	const database = mongo.db("korrero");
	const users = database.collection("users");
	const messages = database.collection("messages");

	const chatids = (await users.findOne({ userid: userid })).chats;

	if (!chatids) {
	}

	const cursor = messages.find({ chatid: { $in: chatids } });
	var chats = [];
	await cursor.forEach((chat) => {
		chats.push(chat);
	});
	return chats;
};

module.exports = createSession;
