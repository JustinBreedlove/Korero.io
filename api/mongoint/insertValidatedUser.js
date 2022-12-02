var mongo = require('./connect');
const insertValidatedUser = async (userData) =>
{
    const database = mongo.db('korrero')
    const users = database.collection('users')

    
    const user = await users.insertOne({
        "userid": userData.userid,
        "username": userData.username,
        "email": userData.email,
        "phone": userData.phone,
        "name_long": userData.name_long,
        "name_short": userData.name_short,
        "user_pfp": "default"
      }
    )

    return user;
}

module.exports = insertValidatedUser