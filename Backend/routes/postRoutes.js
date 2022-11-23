const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

const router = express.Router();

// console.log('signup');

router.post('/post', postController.post);


// router.get('/', authController.vella)

// export default router;
module.exports = router;