import React from 'react';
import './App.css';
import Carts from './components/carts';
import Homepage from "./components/homepage";
import Order from "./components/order";
import Navbar from "./components/navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div className="main_body">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/order" exact component={Order} />
                        <Route path="/carts" component={Carts} />
                    </Switch>
                    <div className="footer-container">
                        <div className="footer container">
                            <p>This website is hosted for demonstration purposes only. It is not an actual shop.</p>

                            <p>&copy; 2021 NULLx (Planspiel Web Engineering)</p>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
