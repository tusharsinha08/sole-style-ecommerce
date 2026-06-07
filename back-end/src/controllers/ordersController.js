const { addOrderDetails, getOrdersByEmail, updateOrderById, getAllOrdersForAdmin, getOrderById, updateOrderByAdmin } = require("../services/ordersService")

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

const getSingleOrder = async (req, res) => {
    const id = req.params.id;
    const result = await getOrderById(id)

    res.send(result)
}

const getAllOrders = async (req, res) => {

    const city = req.query.city;
    const status = req.query.status;
    const sort = req.query.sort;

    const result = await getAllOrdersForAdmin({
        city,
        status,
        sort
    });

    res.send(result);
};

// const getAllOrders = async (req, res) => {
//     const result = await getAllOrdersForAdmin()
    
//     res.send(result)
// }

const updateOrder = async (req, res) => {
    const id = req.params.id
    const { action } = req.body
    const result = await updateOrderById(id, action);

    res.send(result)
}

const updateOrderDetails = async (req, res) => {

    const id = req.params.id;

    const data = req.body;

    const result = await updateOrderByAdmin(id, data );

    res.send(result);
};

const deleteOrder = async (req, res) => {

    const id = req.params.id;

    const result = await deleteOrderById(id);

    res.send(result);
};

module.exports = {
    addOrder,
    getOrders,
    updateOrder,
    getAllOrders,
    deleteOrder,
    getSingleOrder,
    updateOrderDetails
}