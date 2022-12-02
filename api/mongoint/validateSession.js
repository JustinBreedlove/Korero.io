var mongo = require('./connect');

const validateSession = async (username, sessionId) =>
{

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const session = sessions.findOne({"username": username, "sessionid": sessionid})
}

module.exports = validateSession
