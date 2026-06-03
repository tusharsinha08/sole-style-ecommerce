const express = require('express');
const { 
    addUser, 
    updateUser, 
    getUser,  
    getAllUsers
} = require('../controllers/authController');

const router = express.Router();


router.get('/', getAllUsers)

router.post('/', addUser)

router.get("/:email", getUser);

router.put("/", updateUser);

router.patch('/', updateUser);

module.exports = router;