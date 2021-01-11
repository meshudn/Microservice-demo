const express = require('express');
const app = express();
const port = 3052;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

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


app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`)
});





