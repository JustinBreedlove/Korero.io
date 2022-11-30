var mongo = require('./connect');
var crypto = require('crypto')
const insertNewUser = (headers, otp) =>
{
    const userid = crypto.createHash('sha256').update(`${headers['x-korrero-username']}${headers['x-korrero-phone']}`).digest('hex');

    const database = mongo.db('korrero')
    const unvalidated_users = database.collection('unvalidated_users')

    const unvalidated_user = unvalidated_users.insertOne({
        "userid": `${userid}`,
        "username": headers['x-korrero-username'],
        "email": headers['x-korrero-email'],
        "phone": headers['x-korrero-phone'],
        "name_long": `${headers['x-korrero-lastname']}, ${headers['x-korrero-firstname']}`,
        "name_short": headers['x-korrero-firstname'],
        "otp": otp
    })

    console.log(unvalidated_user)
    return;
}

module.exports = insertNewUser