var express = require('express');
var router = express.Router();

var pagesController = require('../controllers/pagesController.js');

router.get('/', pagesController.index);

module.exports = router;
