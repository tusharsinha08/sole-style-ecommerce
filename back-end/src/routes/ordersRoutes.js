const express = require('express');
const { addOrder, getOrders } = require('../controllers/ordersController');


const router = express.Router();

router.post('/', addOrder);

router.get('/', getOrders)


module.exports = router;