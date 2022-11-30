var mongo = require('./connect');

const userExists = async (headers) =>
{

    const database = mongo.db('korrero')
    const users = database.collection('users')

    var query = {username: headers['x-korrero-username']}
    var usernameExists = await users.findOne(query)
    if (usernameExists != null) return true
    
    query = {phone: headers['x-korrero-phone']}
    var phoneExists = await users.findOne(query)
    if (phoneExists != null) return true

    query = {email: headers['x-korrero-email']}
    var emailExists = await users.findOne(query)
    if (emailExists != null) return true



    const unvalidated_users = database.collection('unvalidated_users')

    var query = {username: headers['x-korrero-username']}
    usernameExists = await unvalidated_users.findOne(query)
    if (usernameExists != null) return true
    
    query = {phone: headers['x-korrero-phone']}
    phoneExists = await unvalidated_users.findOne(query)
    if (phoneExists != null) return true

    query = {email: headers['x-korrero-email']}
    emailExists = await unvalidated_users.findOne(query)
    if (emailExists != null) return true




    return false;
}

module.exports = userExists