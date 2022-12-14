var express = require('express');
var router = express.Router();
var fileHandle = require('../services/fileHandle');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool',(req,res)=>{
  res.send('you\'re so cool');
});

router.get('/filetest', fileHandle);

module.exports = router;
