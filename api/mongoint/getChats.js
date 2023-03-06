var mongo = require("./connect");
const getChats = async (userid) => {
	const database = mongo.db("korrero");
	const users = database.collection("users");
	const messages = database.collection("messages");

	const chatids = (await users.findOne({ userid: userid }));

	if (!chatids) {
        return
	}
    
    if(!chatids.chats)
    {
        return []
    }
    
	const cursor = messages.find({ chatid: { $in: chatids.chats } });
	var chats = [];
	await cursor.forEach((chat) => {
		chats.push(chat);
	});
	return chats;
};

module.exports = getChats;
