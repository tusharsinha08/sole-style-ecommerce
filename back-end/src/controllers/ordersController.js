const { addOrderDetails, getOrdersByEmail, updateOrderById } = require("../services/ordersService")

const addOrder = async (req, res) => {
    const orderItem = req.body;

    const result = await addOrderDetails(orderItem);
    res.send(result)
}

const getOrders = async (req, res) => {
    const email = req.query.email;
    const result = await getOrdersByEmail(email)

    res.send(result)
}

const updateOrder = async (req, res) => {
    const id = req.params.id
    const { action } = req.body
    const result = await updateOrderById(id, action);

    res.send(result)
}

module.exports = {
    addOrder,
    getOrders,
    updateOrder
}