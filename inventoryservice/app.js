const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser')
var amqp = require('amqplib/callback_api');

app.use(cors());
app.use(bodyParser.json());
/*
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'orderqueue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            if(msg.content.toString() === "order"){
                console.log("new database rule set");
            }
        }, {
            noAck: true
        });
    });
});
*/
// if(process.env.DATABASENAME && process.env.HOSTNAME && process.env.USERDB && process.env.PASSWORDDB){
//     $databasename = process.env.DATABASENAME;
//     $hostname = process.env.HOSTNAME;
//     $userdb = process.env.USERDB;
//     $passworddb = process.env.PASSWORDDB;
// }
// else{
//     $databasename = "order_db";
//     $hostname = "localhost";
//     $userdb = "root";
//     $passworddb = "";
// }
// var con = mysql.createConnection({
//     host: "vsr-kub005.informatik.tu-chemnitz.de",
//     user: "root",
//     password: "1234",
//     database: "product_db"
// });
// $link = mysql_connect('http://10.105.125.0:3306/', 'root', '1234');
//var con = mysql.createConnection('mysql://root:1234@10.105.125.0:3306/product_db');
var con = mysql.createConnection('mysql://root:@localhost/order_db');

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/products', cors(), (req, res) => {
    var queryStr = "SELECT * FROM products WHERE 1";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.send("not found");
        }
        //console.log("data" + JSON.stringify(data));
        res.status(200);
        res.send(result);
        //console.log(res);
    });
});

app.get('/products/:id', cors(), (req, res) => {
    const item = req.params.id;
    console.log("is number: "+ !isNaN(item));
    if(!isNaN(item)){
        var queryStr = "SELECT * FROM products WHERE products.product_id = " + item ;
        con.query(queryStr, function (error, result, fields) {
            if (error) {
                console.log(error);
                if(error.code == 'ER_BAD_FIELD_ERROR'){
                    res.status(400);
                   
                }
                res.status(404);
                res.send("Please check the requested path. Or bad request can not proceed");
            }
            if(result.length > 0){
                if(result){
                    res.status(200);
                    res.send(result);
                }
            }else{
                res.status(404);
                res.send("Not Found");
            }

        });
    }

    else if(typeof item === 'string'){
        console.log("search key: "+item);
        var queryStr = "SELECT * FROM products WHERE products.quantity LIKE '" + item + "%' OR products.price LIKE '"+ item +"%' OR products.product_name LIKE '"+ item + "%'";
        con.query(queryStr, function (error, result, fields) {
            if (error) {
                console.log(error);
                if(error.code == 'ER_BAD_FIELD_ERROR'){
                    res.status(400);
                    res.send("Bad request. Please check the data format of the product id.");
                }
                res.status(404);
                res.send("Please check the requested path. Or bad request can not proceed");
            }
            if(result.length > 0){
                if(result){
                    res.status(200);
                    res.send(result);
                }
            }else{
                console.log("not found: "+ result);
                res.status(404);
                res.send("Not Found");
            }

        });
    }

    else{
        res.status(400);
        res.send("Bad request. Please check the data format of the product id.");
    }


});

app.post('/products', cors(), (req, res) => {
    const obj = req.body;
    console.log(obj);
    var queryStr = "INSERT INTO products (product_name, price, quantity, product_image) VALUES ('" + obj.product_name + "', '" + obj.price + "', '" + obj.quantity + "', '" + obj.product_image + "')";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request");
        }
        //console.log("data" + JSON.stringify(data));
        if(result){
            res.status(201);
            res.send("location: /products/" + result.insertId);
        }
    });
});


app.delete('/products/:id', cors(), (req, res) => {
    const item = req.params.id;
    var queryStr = "DELETE FROM products WHERE products.product_id = " + item;
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request. Please check your requested path.");
        }
        //console.log("data" + JSON.stringify(data));
        if(result.length > 0){
                res.status(200);
                res.send("Successfully deleted");
        }else{
            res.status(404);
            res.send("Not found");
        }

        //console.log(res);
    });
});

app.get('/test', cors(), (req, res) => {
    res.send("hellow hellow ");
    console.log('hellow hellow hellow');
});


app.put('/products/:id', cors(), (req, res) => {
    const obj = req.body;
    const item = req.params.id;
    console.log(obj);
    var queryStr = "UPDATE products SET product_name = '" + obj.product_name + "', price = '" + obj.price + "', quantity= '" + obj.quantity + "', product_image= '" + obj.product_image + "' WHERE product_id='"+item+"'";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request. Please check your requested path.");
        }
        //console.log("data" + JSON.stringify(data));
        res.status(200);
        res.send("Content updated");
        //console.log(res);
    });
});


app.listen(port, () => {
    console.log(`Inventory Service listening at http://localhost:${port}`)
});





