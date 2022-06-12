var express = require('express');
var router = express.Router();

var addVersion = require('../services/addVersion')
var updateVersion = require('../services/updateVersion')
var removeVersion = require('../services/removeVersion')
var showVersions = require('../services/showVersions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {
  addVersion(req, res, next)
})
router.get('/update', function (req, res, next) {
  updateVersion(req, res, next)
})
router.get('/remove', function (req, res, next) {
  removeVersion(req, res, next)
})
router.get('/show', function (req, res, next) {
  showVersions(req, res, next)
})

module.exports = router;
