const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// All routes of users
router.get('/' ,homeController.home);
router.use('/users', require('./users'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));
router.use('/allocation', require('./allocation'));

module.exports = router;
