/*
* Homepage Component
* Retrieve item from the Apigateway
* */
import React from 'react';
import '../App.css';
import axios from 'axios';
import Product from './product';


class Homepage extends React.Component {

    constructor() {
        super();
        this.state = {
            products: {},
            isCartMenuClick: false,
        }
    }

    componentDidMount() {
        // var productQueryString = process.env.INVENTORYSERVICE || "http://localhost:3002/products";
        axios.get("http://134.109.233.159:30004/products")
            .then(response => {
                const products = response.data;
                console.log(JSON.stringify(products));
                //console.log(products[1].product_id);
                this.setState({
                    products : products
                })
            });
    }
    render() {
        const productlist = [];
        if(this.state.isCartMenuClick){

        }
        try {
            var temp = this.state.products;
            temp.map(function (index) {
                return productlist.push(<Product  key={index.product_id} img={index.product_image} name={index.product_name} price={index.price}/>);
            });
        }
        catch{
            console.log('conversation happening');
        }

        return (
            <div className="homepage container">
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {productlist}
                    </div>
            </div>
        );
    }
}

export default Homepage;
