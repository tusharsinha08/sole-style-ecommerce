const { getOrdersCollection } = require("../config/db")

const addOrderDetails = async (orderItem) => {
    const ordersCollection = getOrdersCollection()

    const result = await ordersCollection.insertOne(orderItem)
    return result
}

const getOrdersByEmail = async (email) => {
    const ordersCollection = getOrdersCollection()
    const query = { email: email }
    const result = await ordersCollection.find(query).toArray()

    return result
}

module.exports = {
    addOrderDetails,
    getOrdersByEmail
}