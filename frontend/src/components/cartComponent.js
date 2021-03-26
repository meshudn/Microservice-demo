import React from "react";
import axios from "axios";

class CartComponent extends React.Component{
    constructor(props) {
        super(props);
    }
    handleRemoves(e, id){
        e.preventDefault();
        var id = 1;
        //var cartService = process.env.CARTSERVICE || "http://localhost:3032/carts/";
        axios.delete("http://134.109.233.159:30032/carts/1", )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="cartItem">
                <img src={this.props.img} className="rounded float-left" alt=""/>
                <h5>{this.props.name}</h5>
                <h6>Price: {this.props.price} €</h6>
                <button onClick={(e, id) => this.handleRemoves(e,this.props.id)} className="btn btn-outline-danger btn-sm">Remove</button>
            </div>
        )
    }
}
export default CartComponent;


