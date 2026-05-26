const express = require('express');
const { addUser, updateUser, getUser, getUsers } = require('../controllers/usersController');
const router = express.Router();

router.get('/', getUsers)

router.post('/', addUser)

router.get("/:email", getUser);

router.put("/", updateUser);

module.exports = router;