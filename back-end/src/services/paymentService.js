const { getPaymentsCollection } = require("../config/db")
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



const addPaymentIntentsStripe = async (amount) => {
    const paymentsCollection = getPaymentsCollection()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'bdt',
        payment_method_types: ['card']
    })


    return (
        { clientSecret: paymentIntent.client_secret }
    );
}

const addPaymentToMongodb = async (payment) => {
    const paymentsCollection = getPaymentsCollection()
    const result = await paymentsCollection.insertOne(payment)

    return result;
}

module.exports = {
    addPaymentIntentsStripe,
    addPaymentToMongodb
}