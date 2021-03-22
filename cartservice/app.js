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

url = 'mongodb://localhost:27017/';
//url = 'mongodb://mongodb-service:27017/';

app.get('/carts/:id', (request, res) => {
    const cart_id = request.params.id;
    console.log(cart_id);
    mongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = {cart_id: cart_id};
        var dbo = db.db("cart_db");
        dbo.collection("carts").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200);
            res.send(result);
            db.close();
        });
    });
});

// add a cart item
app.post('/carts/', (req, res) => {
    res.status(403);
    //res.send("Bad request. Please check the cart ID.");
});


/*
* Insert a cart item
*
*/
app.post('/carts/:id', (req, res) => {
    const cart_id = req.params.id;
    const obj = req.body;
    amqp.connect(url, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                console.log(error1);
                return;
            }
            var cartItemSearchQueue = 'cartItemSearch';

            var msg = {product_id: obj.product_id, quantity: obj.quantity};
            msg = JSON.stringify(msg);

            channel.assertQueue(cartItemSearchQueue, {
                durable: false
            });

            channel.sendToQueue(cartItemSearchQueue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);

            /*
            * Event 2
            * */
            var cartaddedQueue = 'cartadded';

            var msg2 = {product_id: obj.product_id, quantity: obj.quantity};
            msg2 = JSON.stringify(msg2);

            channel.assertQueue(cartaddedQueue, {
                durable: false
            });

            channel.sendToQueue(cartaddedQueue, Buffer.from(msg2));
            console.log(" [x] Sent %s", msg2);

        });

        /*
        * Channel for consuming Data
        * */
        connection.createChannel(function (error1, channel) {
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

            channel.consume(cartItemSearchResultQueue, function (msg) {
                    //console.log(" [x] Received %s", msg.content.toString());
                    let msg_json = JSON.parse(msg.content);
                    console.log("response Event (cart item search result): " + msg_json.hasEnoughQuantity);

                    if (msg_json.hasEnoughQuantity == true) {
                        mongoClient.connect(url, function (err, db) {
                            if (err) throw err;
                            var myobj = {product_id: obj.product_id, quantity: obj.quantity, cart_id: cart_id};
                            console.log("insert item => product_id: " + obj.product_id + ", quantity: " + obj.quantity + ", cart_id: " + cart_id);
                            var dbo = db.db("cart_db");
                            dbo.collection("carts").insertOne(myobj, function (err, response) {
                                if (err) {
                                    res.status(500);
                                    //res.send(err);
                                } else {
                                    console.log("1 document inserted");
                                    res.status(201);
                                    res.send(response);
                                    db.close();
                                }
                            });
                        });
                    } else {
                        res.status(403);
                        //res.send("Bad request. Please check the cart ID.");
                    }
                }
                , {
                    noAck: true
                });
        });
    });
});


// delete a cart item
app.delete('/carts/:id', (req, res) => {
    const cart_id = req.params.id;
    console.log(cart_id);

    /*
    * delete the item from the database
    * */
    mongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var query = {cart_id: cart_id};
        var dbo = db.db("cart_db");
        dbo.collection("carts").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(203);
            res.send(result);
        });
        /*
        * Deleting data
        * */
        var myobj = {product_id: '3', cart_id: cart_id};
        dbo.collection("carts").deleteOne(myobj, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });

    /*
    * Sending a Event for Deleting a cart item
    * Queue: cartDeletedByUser
    * */
    amqp.connect(url, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                console.log(error1);
                return;
            }
            var cartDeletedByUser = 'cartDeletedByUser';

            var msg = {product_id: obj.product_id, quantity: obj.quantity};
            msg = JSON.stringify(msg);

            channel.assertQueue(cartDeletedByUser, {
                durable: false
            });

            channel.sendToQueue(cartDeletedByUser, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
    }); //amqp connection closing..
});

app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`)
});
