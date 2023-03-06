const insertValidatedUser = require('./insertValidatedUser');
const removeUnvalidatedUser = require('./removeUnvalidatedUser')
const validatedUser = async (headers) =>
{
    const userData = await removeUnvalidatedUser(headers['x-korrero-username'], headers['x-korrero-otp'])
    var validated;
    if(userData)
    {
        delete userData._id;
        validated = await insertValidatedUser(userData)
    }

    return validated;

}

module.exports = validatedUser