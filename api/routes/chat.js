var express = require("express");
const createChat = require("../mongoint/createChat");
var router = express.Router();
const getUserInfo = require('../mongoint/getUserInfo');
const updateMessages = require("../mongoint/updateMessages");
const validateSession = require("../mongoint/validateSession");

router.get("/start", async function (req, res, next) {
    res.setHeader('x-korrero-error', false)
    
    const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
   
    if(!isSessionValid)
    {
        res.setHeader('x-korrero-error', true)
        res.send(403)
        return false
    }
    const user1 = await getUserInfo(req.cookies['userid'])
    const user2 = await getUserInfo(req.headers['x-korrero-receiver'])

    const chatid = await createChat(user1,user2, req.headers['x-korrero-msg'])
   
    res.setHeader("x-korrero-chatid", chatid)
    res.send(chatid ? 200 : 500)
});

router.get("/send", async function (req, res, next) {
    res.setHeader('x-korrero-error', false)
    
    const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
	
    if(!isSessionValid)
    {
        res.setHeader('x-korrero-error', true)
        res.send(403)
        return false
    }
    
    const wasMessageSent = await updateMessages(req.headers['x-korrero-chatid'], req.headers, req.cookies['sessionid'])
    
    res.send(wasMessageSent ? 200 : 500)
});

module.exports = router;
