const express = require('express');
const router = express.Router();
const {login , getAllUsers, register, getUserById} = require('../Controllers/auth.controller');

router.post('/login', login);
router.get('/', getAllUsers);
router.post('/register', register)
router.get('/:id', getUserById);
module.exports = router;