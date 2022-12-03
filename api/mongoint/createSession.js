var mongo = require('./connect');
var crypto = require('crypto')
const createSession = async (username, password) =>
{
    const sessionid = crypto.createHash('sha256').update(`${username}${Date.now()}`).digest('hex');

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const shadow = database.collection('shadow')
    const shadowEntry = await shadow.findOne({"username": username})

    const currentHash = crypto.createHash('sha256').update(`${password}${shadowEntry.salt}`).digest('hex');
    
    if (shadowEntry.hash ==  currentHash)
    {
        await sessions.insertOne({"username": username, "sessionid": sessionid})
        return sessionid
    }
    else
    {
        return 403
    }


}

module.exports = createSession
