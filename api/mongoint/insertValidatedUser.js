var mongo = require('./connect');
const { makeKeyPairs } = require("../crypto/HashicorpVault");
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

    await makeKeyPairs(userData.userid);// call function to make key pairs and write them to the vault
  
    return user;

}

module.exports = insertValidatedUser