var mongo = require('./connect');

const destroySession = async (username) =>
{

    const database = mongo.db('korrero')
    const sessions = database.collection('sessions')

    const session = sessions.findOneAndDelete({"username": username})

}

module.exports = destroySession
