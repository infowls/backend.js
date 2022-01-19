var express = require('express');
var router = express.Router();
var fcastController = require('../controllers/fcastController');

/*
 * GET
 */
router.get('/now/:city/:units', fcastController.getNow);

router.get('/daily/:city/:units', fcastController.getGeoLocation, fcastController.getDaily);

module.exports = router;
