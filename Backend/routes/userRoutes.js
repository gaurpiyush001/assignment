const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController')
const router = express.Router();

// console.log('signup');
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/users', userController.getAllUsers);

console.log('hey get all user')

// export default router;
module.exports = router;