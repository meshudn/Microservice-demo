const express = require('express');
const app = express();
const port = 3032;
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cart_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo connected");
});

// get all the cart items
const productQuery = require('./products/queryModel');
app.get('/carts', (req, res) => {
    productQuery.findAll().then((carts) => {
        res.json(carts);
    }).catch((error) => console.log(error));
});

// get all the cart items by id
app.get('/carts/:id', (req, res) => {
    const item = req.params.id;
    console.log(item);
    productQuery.findById(item).then((carts) => {
        res.json(carts);
    }).catch((error) => console.log(error));
});

// add a cart item
app.post('/carts', (req, res) => {
    //const { cartItem } = req.body;
    const obj = req.body;
    productQuery.create(obj.product_name, obj.product_price, obj.product_img).then((carts) => {
         res.json(carts);
    }).catch((error) => console.log(error));
});

// delete a cart item
app.delete('/carts/:id', (req, res) => {
    const item = req.params.id;
    console.log(item);
    productQuery.deleteById(item).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${item}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

// delete a cart item
app.delete('/carts/all', (req, res) => {
    productQuery.deleteMany().then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${item._id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`)
});
