const express = require('express');
const app = express();
const port = 8080;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');

app.use(cors());
app.use(bodyParser.json());

amqp.connect('amqp://localhost', function(error0, connection) {});
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {});
});
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'order';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
});




var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "order_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});



app.get('/products', cors(), (req, res) => {
    var queryStr = "SELECT * FROM products WHERE 1";
    con.query(queryStr, function (error, result, fields) {
        if(error){
            console.log(error);
        }
        //console.log("data" + JSON.stringify(data));
        res.send(result);
    });
});


app.post('/orderrequest', cors(), (req, res) => {
        res.send("done");
});


app.listen(port, () => {
    console.log(`Apigateway Service listening at http://localhost:${port}`)
});
