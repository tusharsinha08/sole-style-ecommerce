const express = require('express');
const { addOrder, getOrders, updateOrder, getAllOrders } = require('../controllers/ordersController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');


const router = express.Router();

router.post('/', addOrder);

router.get('/', verifyToken, getOrders)

router.get('/admin', verifyToken, verifyAdmin, getAllOrders)

router.patch('/:id', updateOrder)


module.exports = router;