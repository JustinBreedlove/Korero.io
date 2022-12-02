var mongo = require('./connect');
var crypto = require('crypto')
const insertPasswordHash = require('./insertPasswordHash')

const insertUnvalidatedUser = async (headers, otp) =>
{
    const userid = crypto.createHash('sha256').update(`${headers['x-korrero-username']}${headers['x-korrero-phone']}`).digest('hex');

    const database = mongo.db('korrero')
    const unvalidated_users = database.collection('unvalidated_users')

    const shadow =  await insertPasswordHash(headers['x-korrero-password'], headers['x-korrero-username'])

    const unvalidated_user = await unvalidated_users.insertOne({
        "userid": `${userid}`,
        "username": headers['x-korrero-username'],
        "email": headers['x-korrero-email'],
        "phone": headers['x-korrero-phone'],
        "name_long": `${headers['x-korrero-lastname']}, ${headers['x-korrero-firstname']}`,
        "name_short": headers['x-korrero-firstname'],
        "otp": otp,
        "attempts": 0
    })

    return unvalidated_user.acknowledged && shadow.acknowledged;

}

module.exports = insertUnvalidatedUser