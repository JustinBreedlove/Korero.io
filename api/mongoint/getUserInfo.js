var mongo = require('./connect');
const getUserInfo = async (lookup = null) =>
{
    const database = mongo.db('korrero')
    const users = database.collection('users')
    var user = null;

    if(lookup && !user)
    {

        user = await users.findOne({"username": lookup});
    }

    if(lookup && !user)
    {
        user = await users.findOne({"phone": lookup});
    }

    if(lookup && !user)
    {
        user = await users.findOne({"email": lookup});
    }

    if(lookup && !user)
    {
        user = await users.findOne({"userid": lookup});
    }

    return user != null ?  user : {};
}

module.exports = getUserInfo