import React from 'react';
import './App.css';
import Carts from './components/carts';
import Homepage from "./components/homepage";
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
                <div className="">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/carts" component={Carts} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
