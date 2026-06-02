const { addPaymentIntentsStripe, addPaymentToMongodb } = require("../services/paymentService")

const addPaymentStripe = async (req, res) => {
    const { amount } = req.body
    const result = await addPaymentIntentsStripe(amount)

    res.send(result);
}

const addPayment = async (req, res) => {
    const payment = req.body
    const result = await addPaymentToMongodb(payment)

    res.send(result)
}

module.exports = {
    addPaymentStripe,
    addPayment
}