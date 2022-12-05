var mongo = require('./connect');

const getUserPfp = async (userid) =>
{
    if(userid == 'undefined')
    {
        return false
    }

    const database = mongo.db('korrero')
    const users = database.collection('users')

    const user = await users.findOne({userid: userid})

    
    return !user ?  user.user_pfp : false
}

module.exports = getUserPfp
