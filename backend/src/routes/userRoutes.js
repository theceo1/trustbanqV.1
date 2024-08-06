const express = require('express');
const { registerUser, authUser, requestPasswordReset, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
