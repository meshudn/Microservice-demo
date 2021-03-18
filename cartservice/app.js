const express = require('express');
const app = express();
const port = process.env.PORT || 3032;
var bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;
var amqp = require('amqplib/callback_api');

const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//mongoose.connect('mongodb://mongodb-service:27017/cart_db');
//mongoose.connect('mongodb://localhost:27017/cart_db');
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo connected");
});*/

/*mongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) throw err;
    var dbo = db.db("cart_db");
    dbo.collection("carts").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
    });
});*/
url = 'mongodb://localhost:27017/';

app.get('/carts/:id', (request, res) => {
    const cart_id = request.params.id;
    console.log(cart_id);
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { cart_id : cart_id };
        var dbo = db.db("cart_db");
        dbo.collection("carts").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200);
            res.send(result);
            db.close();
        });
    });
});

// add a cart item
app.post('/carts/',(req,res) => {
    res.status(403);
    //res.send("Bad request. Please check the cart ID.");
});
app.post('/carts/:id', (req, res) => {
    const cart_id = req.params.id;
    const obj = req.body;
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                console.log( error1);
                return;
            }
            var cartItemSearchQueue = 'cartItemSearch';

            var msg = { product_id: cart_id, quantity: obj.quantity};
            msg = JSON.stringify(msg);

            channel.assertQueue(cartItemSearchQueue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);

            /*
            * Event 2
            * */
            var cartaddedQueue = 'cartadded';

            var msg2 = "899";
            msg2 = JSON.stringify(msg2);

            channel.assertQueue(queue2, {
                durable: false
            });

            channel.sendToQueue(queue2, Buffer.from(msg2));
            console.log(" [x] Sent %s", msg2);

            /*
        * Consuming the response from inventory service
        * Event Name: cart Item search
        * Event response Name: Result of Cart Item Search
        * response: Yes / No (Json)
        * */
            var cartItemSearchResultQueue = 'cartItemSearchResult';
            channel.assertQueue(cartItemSearchResultQueue, {
                durable: false
            });

            channel.consume(cartItemSearchResultQueue, function(msg) {
                    //console.log(" [x] Received %s", msg.content.toString());
                    let msg_json = JSON.parse(msg.content);
                    console.log("msg: " + msg_json.name);
                }
                , {
                    noAck: true
                });
        });

        /*
        * Channel for consuming Data
        * */
        connection.createChannel(function(error1, channel) {
            if (error1) {
                console.log(error1);
                return;
            }
            /*
        * Consuming the response from inventory service
        * Event Name: cart Item search
        * Event response Name: Result of Cart Item Search
        * response: Yes / No (Json)
        * */
            var cartItemSearchResultQueue = 'cartItemSearchResult';
            channel.assertQueue(cartItemSearchResultQueue, {
                durable: false
            });

            channel.consume(cartItemSearchResultQueue, function(msg) {
                    //console.log(" [x] Received %s", msg.content.toString());
                    let msg_json = JSON.parse(msg.content);
                    console.log("msg: " + msg_json.name);
                }
                , {
                    noAck: true
                });

        });
    });

    /*if(cart_id !== null) {
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var myobj = { product_id: obj.product_id, quantity: obj.quantity, cart_id: cart_id };
            var dbo = db.db("cart_db");
            dbo.collection("carts").insertOne(myobj, function(err, response) {
                if (err) {
                    res.status(500);
                    //res.send(err);
                }else{
                    console.log("1 document inserted");
                    res.status(201);
                    res.send(response);
                    db.close();
                }
            });
        });
    }
    else {
        res.status(403);
        //res.send("Bad request. Please check the cart ID.");
    }*/
});

// get all the cart items
/*
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
*/

app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`)
});
