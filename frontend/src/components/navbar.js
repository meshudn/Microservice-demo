import React from "react";
import {Link} from "react-router-dom";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="navbar-header">
                <div className="container">
                    <div className="col-sm-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#"><img src="logo.png" alt=""/></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/order">My Order</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/carts">Carts</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;


