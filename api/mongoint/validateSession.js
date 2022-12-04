var mongo = require('./connect');

const validateSession = async (username, sessionid) =>
{

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const session = await sessions.findOne({"username": username, "sessionid": sessionid})
    
    return true
    return session != null
}

module.exports = validateSession
