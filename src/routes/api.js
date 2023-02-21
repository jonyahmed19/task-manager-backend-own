const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/generalController");
const UsersController = require('../controllers/UsersControllers');
const AuthVerify = require('../middlewares/AuthVerifyMiddleware');
const TasksController = require('../controllers/TasksControllers')
/**
 * Health Check
 */
router.get("/health", healthCheck);


/**
 * User Authentication
 */

router.post('/register', UsersController.registration)
router.post('/login', UsersController.login);
router.post('/profileUpdate', AuthVerify, UsersController.profileUpdate);
router.get('/profileDetails', AuthVerify, UsersController.profileDetails);

/***
 * Reset Password
 */
router.get('/recoverVerifyEmail/:email', UsersController.recoverVerifyEmail)
router.get('/recoverVerifyOTP/:email/:otp', UsersController.recoverVerifyOTP)
router.post('/recoverResetPass', UsersController.recoverResetPass)



/***
 * Task CRUD
 */

router.post('/create', AuthVerify, TasksController.createTask);
router.get('/all', AuthVerify, TasksController.readTasks);
router.get('/tasksbystatus/:status', AuthVerify, TasksController.tasksByStatus)
router.get('/tasksCountonStatus', AuthVerify, TasksController.tasksCountOnStatus)
router.get('/updateTaskStatus/:id/:status', AuthVerify, TasksController.updateTaskStatus)
router.post('/updateTaskText/:id/', AuthVerify, TasksController.updateTaskText)
router.get('/deleteTask/:id', AuthVerify, TasksController.deleteTask)

module.exports = router;
