var express = require("express");
const createChat = require("../mongoint/createChat");
var router = express.Router();
const getUserInfo = require('../mongoint/getUserInfo');
const updateMessages = require("../mongoint/updateMessages");
const validateSession = require("../mongoint/validateSession");
const getChats = require("../mongoint/getChats");
var exec = require("child_process").exec;


router.post("/start", async function (req, res, next) {
    res.setHeader('x-korrero-error', false)
    
    const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
   
    if(!isSessionValid)
    {
        res.setHeader('x-korrero-error', true)
        res.sendStatus(403)
        return false
    }
    const user1 = await getUserInfo(req.cookies['userid'])
    const user2 = await getUserInfo(req.body.receiver)

    if(!Object.keys(user1).length)    
    {
        res.setHeader('x-korrero-error', true)
        res.sendStatus(400)
        return false
    }

    if(!Object.keys(user2).length)
    {
        exec(`echo You have been invited to Korrero!  | mail -s "${user1.username} sent you an invite." ${req.body.receiver}`);
        return false
    
    }

    const chatid = await createChat(user1,user2, req.body.msg)

    res.send(chatid)
});

router.post("/send", async function (req, res, next) {
    res.setHeader('x-korrero-error', false)
    
    const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
	
    if(!isSessionValid)
    {
        res.setHeader('x-korrero-error', true)
        res.send(403)
        return false
    }
    const sender = await getUserInfo(req.cookies['userid'])
    const wasMessageSent = await updateMessages(req.body.chatid,  sender, req.body.msg)
    
    res.send(wasMessageSent ? 200 : 500)
});

router.get("/get", async function (req, res, next) {
    res.setHeader('x-korrero-error', false)
    
    const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
	
    if(!isSessionValid)
    {
        res.setHeader('x-korrero-error', true)
        res.send(403)
        return false
    }

    const chats = await getChats(req.cookies['userid'])
    
    res.send(!chats ? 500 : chats) 
});


module.exports = router;
