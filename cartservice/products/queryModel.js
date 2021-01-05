const Product = require('../models/productModel');

class ProductQuery {
    /**
     * @param {*} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * @param {String} name
     */
    create(name) {
        const newCartItem = { name, done: false };
        // eslint-disable-next-line new-cap
        const cart = new this.model(newCartItem);

        return cart.save();
    }

    findAll() {
        return this.model.find();
    }

    /**
     * @param {Integer} id
     */
    findById(id) {
        return this.model.findById(id);
    }

    /**
     * @param {integer} id
     */
    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    /**
     *
     * @param {integer} id
     * @param {*} object
     */
    updateById(id, object) {
        const query = { _id: id };
        return this.model.findOneAndUpdate(query, { $set: { product_name: object.product_name, product_price: object.product_price, product_img: object.product_img } });
    }
}

module.exports = new ProductQuery(Product);
