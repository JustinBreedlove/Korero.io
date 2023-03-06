var express = require('express');
var router = express.Router();
const getUserPfp = require('../mongoint/getUserPfp')
/* GET users listing. */
router.get('/pfp/:userid', async function(req, res, next) {

  const pfp = await getUserPfp(req.params['userid'])
  res.send(pfp ? pfp : 400)
});

module.exports = router;
