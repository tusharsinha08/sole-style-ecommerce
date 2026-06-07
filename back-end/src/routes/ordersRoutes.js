const express = require('express');
const { addOrder, getOrders, updateOrder, getAllOrders, deleteOrder } = require('../controllers/ordersController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');


const router = express.Router();

router.post('/', addOrder);

router.get('/', verifyToken, getOrders)

router.get('/admin', verifyToken, verifyAdmin, getAllOrders)

router.patch('/:id', verifyToken, updateOrder)

router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);


module.exports = router;