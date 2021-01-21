import React from "react";
import axios from "axios";


class CartComponent extends React.Component{
    constructor(props) {
        super(props);
    }
    handleRemoves(e, id){
        console.log("click" + id);

        axios.delete('http://localhost:3032/carts/'+id, )
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
                <h4>{this.props.name}</h4>
                <h5>Price: {this.props.price} €</h5>
                <button onClick={(e, id) => this.handleRemoves(e,this.props.id)} className="btn btn-outline-danger btn-sm">remove</button>
            </div>
        )
    }
}
export default CartComponent;


