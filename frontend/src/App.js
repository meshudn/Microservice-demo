import React from 'react';
import './App.css';
import axios from 'axios';
import Product from './components/product';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            products: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/products')
            .then(response => {
                const products = response.data;
                console.log(JSON.stringify(products));
                //console.log(products[1].product_id);
                this.setState({
                    products : products
                })
            })
    }


    render() {
        const productlist = [];
        try {
            var temp = this.state.products;
            temp.map(function (index) {
                return productlist.push(<Product key={index.product_id} img={index.product_image} name={index.product_name} price={index.price}/>);
            });
        }
        catch{
            console.log('conversation happening');
        }
        return (
            <div className="header">
                <header>
                    <h3>Product List</h3>
                </header>

                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {productlist}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
