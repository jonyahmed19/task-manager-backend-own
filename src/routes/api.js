const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/generalController");
const UsersController = require('../controllers/UsersControllers')
const AuthVerify = require('../middlewares/AuthVerifyMiddleware')
/**
 * Health Check
 */
router.get("/health", healthCheck);


/**
 * User Authentication
 */

router.post('/register', UsersController.registration)
router.post('/login', UsersController.login);
router.put('/profileUpdate', AuthVerify, UsersController.update);



module.exports = router;
