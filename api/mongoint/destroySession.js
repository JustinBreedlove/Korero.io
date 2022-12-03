var mongo = require('./connect');

const destroySession = async (username) =>
{

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const session = await sessions.deleteMany({"username": username})

    return session.acknowledged
}

module.exports = destroySession
