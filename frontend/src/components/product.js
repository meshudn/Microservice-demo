import React from "react";

function Product(props){

    return(
        <div className="col">
            <div className="card">
                <img src={props.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <h6 className="card-text">Price: {props.price}</h6>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product;


