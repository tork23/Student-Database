const express = require('express');
const router = express.Router();
const allocationController = require('../controllers/allocation_controller')

router.get('/schedule/:id',allocationController.scheduleInterview);
router.post('/adding-student/:id',allocationController.addStudent);
router.post('/updating-result/:id',allocationController.updateResult);


module.exports = router;