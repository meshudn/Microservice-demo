const express = require('express');
const app = express();
const port = 3042;
var bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


// add a cart item
app.post('/shippingrequest', (req, res) => {
   res.json("shipping progress");
});


app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`)
});