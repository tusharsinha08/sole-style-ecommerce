const express = require('express');
const { addCart, getCarts, deleteCart, updateCart, deleteCarts } = require('../controllers/cartsController');


const router = express.Router();

router.post('/', addCart);

router.get('/', getCarts)

router.delete('/delete-many', deleteCarts)

router.delete('/:id', deleteCart)

router.patch('/:id', updateCart)


module.exports = router;