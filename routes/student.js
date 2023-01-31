const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controllers/student_controller');


router.get('/add_student',studentController.addStudent);
router.post('/create_student',studentController.createStudent);
router.get('/student_list',studentController.studentList);


module.exports = router;