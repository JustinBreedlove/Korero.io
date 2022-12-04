var mongo = require('./connect');

const getUserPfp = async (userid) =>
{

    const database = mongo.db('korrero')
    const users = database.collection('users')

    const user = await users.findOne({userid: userid})
    
    return user.user_pfp
}

module.exports = getUserPfp
