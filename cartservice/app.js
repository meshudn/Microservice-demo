const express = require('express');
const app = express();
const port = 3032;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://localhost:27017/cart_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo connected");
});


const productQuery = require('./products/queryModel');
app.get('/carts', cors(), (req, res) => {
    productQuery.findAll().then((carts) => {
        res.json(carts);
    }).catch((error) => console.log(error));
});
// add a todo item
app.post('/', (req, res) => {
    const { name } = req.body;
    repository.create(name).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
});

app.listen(port, () => {
    console.log(`Apigateway Service listening at http://localhost:${port}`)
});
