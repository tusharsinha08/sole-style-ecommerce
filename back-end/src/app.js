const express = require('express');
const cors = require('cors');

const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use('/products', productsRoutes);

app.use("/users", usersRoutes);


app.get('/', (req, res) => {
    res.send('Sole Style E-commerce Server is Running');
});

module.exports = app;