var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

router.post('/login', userController.logIn);

router.post('/logout', userController.logOut);

/*
 * PUT
 */
router.put('/:id', userController.update);

router.put('/addCity/:id', userController.addCity);

router.put('/removeCity/:id', userController.removeCity);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
