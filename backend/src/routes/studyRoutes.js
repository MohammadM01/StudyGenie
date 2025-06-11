const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

router.post('/generate-plan', studyController.generatePlan);
router.get('/plans', studyController.getPlans);
router.put('/plans/:id', studyController.updatePlan);

module.exports = router;