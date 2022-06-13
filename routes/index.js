var express = require('express');
var router = express.Router();

var addVersion = require('../services/addVersion')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/add', function (req, res, next) {
  addVersion(req, res, next)
})

module.exports = router;
