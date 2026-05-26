const express = require('express');
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.post('/jwt', (req, res) => {
    const user = req.body
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.send({token})
})

app.use('/products', productsRoutes);

app.use("/users", authRoutes);


app.get('/', (req, res) => {
    res.send('Sole Style E-commerce Server is Running');
});

module.exports = app;