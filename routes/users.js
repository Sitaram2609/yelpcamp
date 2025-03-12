const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/user');

// Routes for user authentication
router
  .route('/register')
  .get(user.renderRegister) // Render the registration form
  .post(catchAsync(user.register)); // Handle registration logic

router
  .route('/login')
  .get(user.renderlogin) // Render the login form
  .post(
    storeReturnTo, // Save the returnTo value
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    user.login
  ); // Handle login logic

router.get('/logout', user.logout); // Handle logout

module.exports = router;
