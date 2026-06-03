const express = require('express');
const { addContact } = require('../controllers/contactsController');


const router = express.Router()

router.post('/', addContact)

module.exports = router;