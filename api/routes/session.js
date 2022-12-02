var express = require('express');
var router = express.Router();
const createSession = require('../mongoint/createSession')
router.get('/login', function(req, res, next) {

    const sessionId = createSession(req.headers['x-korrero-username'], req.headers['x-korrero-password'])
    if (sessionId != 403)
    {
        res.cookie(sessionId);
        res.send(200)
    }
    else if (sessionId == 403)
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

    destroySession(req.headers['x-korrero-password'])

    res.cookie(sessionId);
    res.send(200)
});


module.exports = router;
