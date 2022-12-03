var mongo = require("./connect");
const validateSession = require("./validateSession");
const updateMessages = async (chatid, sender, msg) => {
	const database = mongo.db("korrero");
	const messages = database.collection("messages");

	const chat = await messages.findOne({ chatid: chatid });
	console.log(chat);

	if (chat != null) {
		const m = chat.messages;
		const updatedMessage = messages.findOneAndUpdate(
			{ chatid: chatid },
			{
				"$push": {
					"messages": {
						sender: sender.userid,
						name: sender.name_short, // shortname
						message: msg,
						isread: 0,
						ts: Date.now()
					}
				}
			}
		);
		return updatedMessage != null
	}

	return false;
};

module.exports = updateMessages;
