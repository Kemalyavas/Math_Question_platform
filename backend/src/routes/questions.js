const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth');

// Tüm route'lar korumalı (giriş yapmış kullanıcılar için)
router.get('/', auth, questionController.getQuestions);
router.post('/download', auth, questionController.downloadQuestions);
router.post('/create', auth, questionController.createQuestion);
router.get('/:id', auth, questionController.getQuestionById);

module.exports = router;