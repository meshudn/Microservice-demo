const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for cart items
const cartSchema = new Schema({
    product_name: {
        type: String,
    },
    product_price: {
        type: String,
    },
    product_img: {
        type: String,
    },
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
