const insertValidatedUser = require('./insertValidatedUser');
const removeUnvalidatedUser = require('./removeUnvalidatedUser')
const validatedUser = async (body) =>
{
    const userData = await removeUnvalidatedUser(body.username, body.otp)
    var validated;
    if(userData)
    {
        delete userData._id;
        validated = await insertValidatedUser(userData)
    }

    return validated;

}

module.exports = validatedUser