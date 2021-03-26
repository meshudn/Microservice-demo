import React from 'react';
import '../App.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import CartComponent from "./cartComponent";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {}
        }
    }


    componentDidMount() {
        axios.get('http://134.109.233.159:30011/orders')
            .then(response => {
                const products = response.data;
                console.log("order page: "+ JSON.stringify(products));
                //console.log(products[1].product_id);
                this.setState({
                    products : products
                })
            });
    }





    render() {
        console.log("order page");
        const cartList = [];
        try {
            var temp = this.state.products;
            temp.map(function (index) {
                return cartList.push(<orderItem key={index.cart_id} cart_id={index.cart_id}/>);
            });

        }
        catch{
            console.log('conversation happening component before mount');
        }
        return (
            <div className="orderpage container">
                <br/>
                <br/>
                <br/>

                <h5>Order List</h5>
                <div className="row header">

                    <ul className="">
                       <li>
                           <h6>Order ID: #616eff49-8df7-11eb-8010-4e3ff49ddcf</h6>
                           <p>Track ID: OI-44712-223541653</p>
                       </li>
                        <li>
                            <h6>Order ID: #626eff49-3df7-11eb-8010-4e3e0dff49f</h6>
                            <p>Track ID: OI-55712-223590653</p>
                        </li>
                        <li>
                            <h6>Order ID: #616eff49-8df7-11eb-8010-48010bc62cf</h6>
                            <p>Track ID: OI-44452-233241653</p>
                        </li>
                        <li>
                            <h6>Order ID: #616eff49-9029-11eb-8010-8010csd62cf</h6>
                            <p>Track ID: OI-44712-223541653</p>
                        </li>
                        <li>
                            <h6>Order ID: #616eff49-9029-11eb-8010-4e3e078010</h6>
                            <p>Track ID: OI-44712-553491653</p>
                        </li>

                    </ul>

                </div>
            </div>
        );
    }
}

export default Order;
