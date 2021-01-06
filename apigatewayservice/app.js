const express = require('express');
const app = express();
const port = 8080;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());


app.get('/products', cors(), (req, res) => {

});

app.post('/orderrequest', cors(), (req, res) => {
        res.send("done");
});


app.listen(port, () => {
    console.log(`Apigateway Service listening at http://localhost:${port}`)
});
