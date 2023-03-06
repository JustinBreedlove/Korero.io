var mongo = require('./connect');

const destroySession = async (sessionid) =>
{

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const session = await sessions.findOneAndDelete({"sessionid": sessionid})

    return session.acknowledged
}

module.exports = destroySession
