var mongo = require('./connect');
var crypto = require('crypto')
const insertPasswordHash = async (password, username) =>
{
    const salt = Math.floor(Math.random() * 10 ** 8)
    const hashedpassword = crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');

    const database = mongo.db('korrero')
    const shadow = database.collection('shadow')
    const shadowEntry = await shadow.insertOne({
        "username": `${username}`,
        "hash": hashedpassword,
        "salt": salt
    })
    return shadowEntry;
}

module.exports = insertPasswordHash