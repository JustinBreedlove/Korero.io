var mongo = require('./connect');
const removeUnvalidatedUser = async (username, otp) =>
{
    const database = mongo.db('korrero')
    const unvalidated_users = database.collection('unvalidated_users')
    const unvalidated_user = await unvalidated_users.findOne({"username" : username})
    
    var validOtp;

    if ( unvalidated_user && unvalidated_user.attempts <= 3)
    {
        validOtp = await unvalidated_users.findOneAndDelete({"username" : username, "otp": parseInt(otp)})
        
        if (validOtp.value == null)
        {
            unvalidated_users.findOneAndUpdate  ({"username":username },  { "$inc": { "attempts" : 1 } })
        }

    }
    else
    {
        await unvalidated_users.findOneAndDelete({"username" : username})
    }

    return  !validOtp || validOtp.value == null ? false : unvalidated_user;
}

module.exports = removeUnvalidatedUser