import React from 'react';
import './App.css';
import axios from 'axios';


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
        const product_temp = this.state.products;
        const productlist = product_temp.map((index) => {
            
        });
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
