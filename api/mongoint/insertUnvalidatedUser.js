var mongo = require('./connect');
var crypto = require('crypto')
const insertPasswordHash = require('./insertPasswordHash')

const insertUnvalidatedUser = async (body, otp) =>
{
    const userid = crypto.createHash('sha256').update(`${body.username}${body.phone}`).digest('hex');

    const database = mongo.db('korrero')
    const unvalidated_users = database.collection('unvalidated_users')

    const shadow =  await insertPasswordHash(body.password, body.username)

    const unvalidated_user = await unvalidated_users.insertOne({
        "userid": `${userid}`,
        "username": body.username,
        "email": body.email,
        "phone": body.phone,
        "name_long": `${body.lastname}, ${body.firstname}`,
        "name_short": body.firstname,
        "otp": otp,
        "attempts": 0
    })

    return unvalidated_user.acknowledged && shadow.acknowledged;

}

module.exports = insertUnvalidatedUser