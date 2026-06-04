const express = require('express');
const { 
    addUser, 
    updateUser, 
    getUser,  
    getAllUsers
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

const router = express.Router();


router.get('/', verifyToken, getAllUsers)

router.post('/', verifyToken, verifyAdmin, addUser)

router.get("/:email", verifyToken, getUser);

router.put("/", verifyToken, updateUser);

router.patch('/', verifyToken, updateUser);

module.exports = router;