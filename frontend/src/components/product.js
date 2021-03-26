import React from "react";
import axios from 'axios';
import '../App.css';
class Product extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log("product child click event");
        axios.post('http://134.109.233.159:30032/carts/1', {
            product_id: "1",
            product_name: this.props.name,
            product_price: this.props.price,
            product_image: this.props.img,
            quantity: "20",
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="col">
                <div className="card">
                    <img src={this.props.img} className="card-img-top img-fluid" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <h6 className="card-text">Price: {this.props.price} €</h6>
                    </div>
                    <div className="card-footer">
                        <button onClick={() => this.handleClick()} className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product;


