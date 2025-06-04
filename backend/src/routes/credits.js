const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');
const auth = require('../middleware/auth');

router.post('/purchase', auth, creditController.purchaseCredits);
router.get('/history', auth, creditController.getCreditHistory);

module.exports = router;