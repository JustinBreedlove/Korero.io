var mongo = require("./connect");
const crypto = require("crypto");
const validateSession = require("./validateSession");
const getUserInfo = require("./getUserInfo");

const createChat = async (user1, user2, msg, sessionid) => {
	const chatid = crypto.createHash("sha256").update(`${user1.userid}${user2.userid}`).digest("hex");

	const database = mongo.db("korrero");
	const messages = database.collection("messages");

	const chat = await messages.findOne({ chatid: chatid });


	if (chat == null) {
	    const users = database.collection("users");

        users.findOneAndUpdate(
            { userid: user1.userid },
            {
                $push: {
                    chats: chatid
                }
            }
        );
    
        users.findOneAndUpdate(
            { userid: user2.userid },
            {
                $push: {
                    chats: chatid
                }
            }
        );

        
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

	return chat != null ? 400 : 500
};

module.exports = createChat;
