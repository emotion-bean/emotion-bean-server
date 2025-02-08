const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController'); // controllers 불러오기


router.post('/upload', diaryController.upload);
router.get('/show/:email',diaryController.show); 

module.exports = router;
