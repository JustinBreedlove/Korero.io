var mongo = require('./connect');

const verifyOtp = async (headers) =>
{

    const database = mongo.db('korrero')
    const users = database.collection('users')
    const unvalidated_users = database.collection('unvalidated_users')


    /**
     * If unvalidated user exists and if they have the correct otp value then insert into
     * users and delete from unvalidated users.
     */

}

module.exports = verifyOtp
