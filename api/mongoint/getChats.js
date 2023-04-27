// Importing the MongoDB connection module
var mongo = require("./connect");
var {decryptAMessage}  = require("../crypto/HashicorpVault");

// Defining an async function that takes a userid as a parameter and returns an array of chats
const getChats = async (userid) => {

	// Connecting to the 'korrero' database and accessing the 'users' and 'messages' collections
	const database = mongo.db("korrero");
	const users = database.collection("users");
	const messages = database.collection("messages");

	// Retrieving the chatids of the user with the specified userid
	const chatids = (await users.findOne({ userid: userid }));

	// If the chatids are not found, return undefined
	if (!chatids) {
        return
	}

    // If the user has no chats, return an empty array
    if(!chatids.chats)
    {
        return []
    }

    // Retrieving all messages from chats that the user is a member of
	const cursor = messages.find({ chatid: { $in: chatids.chats } });
	var chats = [];

	// Iterating over each message and pushing it to the chats array
	for await (const chat of cursor) {
		const user1 = chat.userid1;
		const user2 = chat.userid2;
		const decryptedMessages = await Promise.all(chat.messages.map(async (message) => {
	  		const sender = message.sender;
	 		const receiver = (sender === user1) ? user2 : user1;
	  		const decryptedMsg = await decryptAMessage(message.message, receiver);
	  		return { ...message, message: decryptedMsg };
	}));
  
	chats.push({ ...chat, messages: decryptedMessages });
  }

	// Returning the array of chats
	return chats;
};

// Exporting the getChats function for use in other modules
module.exports = getChats;
