var mongo = require('./connect');
const validateSession = require('./validateSession');
const updateMessages = async (chatid, headers, sessionid) =>
{
	const isSessionValid = await validateSession(headers['x-korrero-username'], sessionid);
    
    if(!isSessionValid) return false;

    const database = mongo.db("korrero");
	const messages = database.collection("messages");

    const chat = await messages.findOne({"chatid" : chatid})
   
    if (chat != null)
    {
        const m = chat.messages
        const updatedMessage = messages.findOneAndUpdate({"chatid" : chatid}, { $set: { "messages.$": headers['x-korrero-msg'] } })
        console.log(updateMessages)
        return messageUpdated.value
    }
   
    return false;
}

module.exports = updateMessages