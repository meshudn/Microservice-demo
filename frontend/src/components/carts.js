import React from 'react';
import '../App.css'
import axios from 'axios';
import CartComponent from './cartComponent';
import {Link} from "react-router-dom";

class Carts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {},
            totalAmount: 0,
            productSum: 0,
            productItemCount: 0,
            orderResponse: false
        }
        this.handleRemoves = this.handleRemoves.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:3032/carts')
            .then(response => {
                const products = response.data;
                console.log("carts page: "+ JSON.stringify(products));
                //console.log(products[1].product_id);
                this.setState({
                    products : products
                })
            });
    }



    handleCheckoutClick(){
        /*
        * Sending POST to the apiGateway
        * Order request
        * */
        this.customerId = 1;
        axios.post('http://localhost:8080/orderrequest', {
           order_request: "true"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            orderResponse : true
        })
    }
    handleChange(event){
        const {name,value} = event.target;
        this.setState({
            [name] : value
        });
    }
    handleEmptyCart(){

    }
    /*
    * @param {integer} id
    * */
    handleRemoves(){

        console.log("clicks: ");

       /* axios.delete('http://localhost:3050/carts/'+id, {
            order_request: "true"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
*/

    }

    render() {
        console.log("carts page");
        const cartList = [];
        try {
            var temptotal = 0;
            var temp = this.state.products;
            var count = 0;
            temp.map(function (index) {
                if(index.product_price){
                    temptotal = temptotal + parseInt(index.product_price);
                    count+= 1;
                }
                return cartList.push(<CartComponent key={index._id}  id={index._id} img={index.product_img} name={index.product_name} price={index.product_price}/>);
            });

            this.state.productSum = temptotal;
            if(temptotal>0)
               temptotal += 20;
            this.state.totalAmount = ""+temptotal;
            this.state.productItemCount = ""+count;
        }
        catch{
            console.log('conversation happening component before mount');
        }
        var orderResponseText;
        if(this.state.orderResponse){
            orderResponseText = "Successfully order generated"
            this.state.orderResponse=false;
        }
        return (
            <div className="cartpage container">
                <div className="row header">
                    <h3>Shopping Cart ({this.state.productItemCount} items)</h3>
                    <ul className="list-unstyled ml-auto cartpageul">
                        <li><a onClick={() => this.handleEmptyCart()} className="btn btn-outline-danger" href="">Empty Cart</a></li>
                        <li><Link className="btn btn-outline-primary" to="/">Continue Shopping</Link></li>
                    </ul>
                </div>

                <div className="row cart-content">
                    <div className="col-sm-8 d-flex flex-column cart-body">
                        {cartList}
                    </div>
                    <div className="col-sm-4 cart-amount-body">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Amount</h5>
                                <br/>
                                <h6 className="card-subtitle mb-2 text-muted">Amount: ${this.state.productSum}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Shipping: $10</h6>
                                <hr/>
                                <h6 className="card-subtitle mb-2 text-muted">Total Amount (including VAT): ${this.state.totalAmount}</h6>
                                <br/>
                                <button onClick={() => this.handleCheckoutClick()}  className="btn btn-sm btn-block btn-primary">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <p className="text-success">{orderResponseText}</p>
                </div>
            </div>
        );
    }
}

export default Carts;
