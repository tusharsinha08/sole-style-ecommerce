const express = require('express');
const { 
    addUser, 
    updateUser, 
    getUser,  
    getAllUsers,
    getUserById,
    updateUserById
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

const router = express.Router();


router.get('/', getAllUsers)

router.post('/', addUser)

router.get("/id/:id", verifyToken, verifyAdmin, getUserById);

router.get("/email/:email", verifyToken, getUser);

router.patch('/', verifyToken, updateUser);

router.patch('/:id', verifyToken, verifyAdmin, updateUserById);

module.exports = router;