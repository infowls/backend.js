var express = require('express');
var router = express.Router();
var fcastController = require('../controllers/fcastController');

/*
 * GET
 */
router.get('/now', fcastController.getNow);

router.get('/daily', fcastController.getGeoLocation, fcastController.getDaily);

module.exports = router;
