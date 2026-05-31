const express = require('express');
const { addOrder, getOrders, updateOrder } = require('../controllers/ordersController');


const router = express.Router();

router.post('/', addOrder);

router.get('/', getOrders)

router.patch('/:id', updateOrder)


module.exports = router;