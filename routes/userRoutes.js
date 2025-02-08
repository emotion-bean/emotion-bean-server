const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // controllers 불러오기

// 회원가입
router.post('/signup', userController.signup);

// 로그인
router.post('/login', userController.login);

// 열매 수정
router.patch('/edit', userController.edit);

module.exports = router;
