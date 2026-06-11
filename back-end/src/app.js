require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')

const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require("./routes/authRoutes");
const cartsRoutes = require('./routes/cartsRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const contactsRoutes = require("./routes/contactsRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.post('/jwt', (req, res) => {
    const user = req.body
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.send({token})
})

app.use('/products', productsRoutes);

app.use("/users", authRoutes);

app.use('/carts', cartsRoutes)

app.use('/orders', ordersRoutes)

app.use("/payments", paymentRoutes);

app.use("/notifications", notificationsRoutes);

app.use('/contacts', contactsRoutes)

app.use('/reviews', reviewRoutes)


app.get('/', (req, res) => {
    res.send('Sole Style E-commerce Server is Running');
});

module.exports = app;