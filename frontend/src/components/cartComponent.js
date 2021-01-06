import React from "react";


class CartComponent extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="cartItem">
                <img src="../product.jpg" className="rounded float-left" alt=""/>
                <h4>{this.props.name}</h4>
                <h5>Price: {this.props.price}</h5>
                <button className="btn btn-outline-danger btn-sm">remove</button>
            </div>
        )
    }
}
export default CartComponent;


