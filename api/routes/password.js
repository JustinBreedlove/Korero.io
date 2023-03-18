var express = require('express');
var router = express.Router();

router.post('/reset', function(req, res, next) {
    console.log("restet")
    res.send(200)
});

router.post('/user', function(req, res, next) {
    console.log("restet")
    res.send(200)
});


module.exports = router;
