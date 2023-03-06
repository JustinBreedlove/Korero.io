var mongo = require('./connect');

const userExists = async (body) =>
{

    const database = mongo.db('korrero')
    const users = database.collection('users')

    var query = {username: body.username}
    var usernameExists = await users.findOne(query)
    if (usernameExists != null) return true
    
    query = {phone: body.phone}
    var phoneExists = await users.findOne(query)
    if (phoneExists != null) return true

    query = {email: body.email}
    var emailExists = await users.findOne(query)
    if (emailExists != null) return true



    const unvalidated_users = database.collection('unvalidated_users')

    var query = {username: body.username}
    usernameExists = await unvalidated_users.findOne(query)
    if (usernameExists != null) return true
    
    query = {phone: body.phone}
    phoneExists = await unvalidated_users.findOne(query)
    if (phoneExists != null) return true

    query = {email: body.email}
    emailExists = await unvalidated_users.findOne(query)
    if (emailExists != null) return true




    return false;
}

module.exports = userExists