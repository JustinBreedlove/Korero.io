var express = require('express');
var router = express.Router();
const createSession = require('../mongoint/createSession')
const destroySession = require('../mongoint/destroySession')
const getUserInfo = require('../mongoint/getUserInfo')

router.post('/login', async function(req, res, next) {
    const user = await getUserInfo(req.body.username)
    /**Check if user is a validated user first, this is a bug that creates a useless session*/
    if(!user || Object.keys(user).length == 0){
        res.send(403)
        return;
    }

    const sessionid = await createSession(req.body.username, req.body.password)
    if (sessionid != 403)
    {
        res.cookie("sessionid", sessionid);
        res.cookie("userid", user.userid)
        res.cookie("username", user.username)

        res.send(200)
    }
    else if (sessionid == 403)
    {
        res.setHeader("x-korrero-error", true)
        res.send(403)
    }
    else
    {
        res.setHeader("x-korrero-error", true)
        res.send(500)
    }
});

router.get('/logout', function(req, res, next) {

    destroySession(req.cookies.sessionid)

    res.cookie("sessionid", 0);
    res.cookie("userid", 0);
    res.cookie("username", 0);

    res.send(200)
});


module.exports = router;
