const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewController = require('../controllers/interview_controller');



router.get('/add_interview',interviewController.addInterview);
router.post('/create_interview',interviewController.createInterview);
router.get('/interview_list', interviewController.interviewList);

module.exports = router;