const express = require('express');
const router = express.Router();
const passport = require('passport');
const { downloadCSV } = require("../controllers/csv_controller");

const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);

// Routes starting from users
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.get('/csv/download_csv', downloadCSV);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

module.exports = router;