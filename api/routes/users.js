var express = require('express');
var router = express.Router();
const getUserPfp = require('../mongoint/getUserPfp')
const getUserInfo = require('../mongoint/getUserInfo')
const uploadPfp = require('../mongoint/uploadPfp')
const validateSession = require("../mongoint/validateSession");

/* GET users listing. */
router.get('/pfp/:userid', async function(req, res, next) {

  const pfp = await getUserPfp(req.params['userid'])

  res.send(pfp ? pfp : 400)
});

router.post('/upload/pfp', async function(req, res, next) {

	res.setHeader("x-korrero-error", false)


  const isSessionValid = await validateSession(req.cookies['username'], req.cookies['sessionid'])
	
  if(!isSessionValid)
  {
      res.setHeader('x-korrero-error', true)
      res.send(403)
      return false
  }

  const uploadedPfp = await uploadPfp(req.cookies['userid'], req.body.upload.substring(23, req.body.upload.length))

  res.send(uploadedPfp === true ? 200 : 500)

});
module.exports = router;
