import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router} from 'react-router-dom';
import './navbar.less'

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: '商品',
            comment: '评价',
            seller: '商家'
        };
    }

    render() {
        return (
            <nav className="navbar border-1px">
                    <ul>
                        <li className="nav-options"><NavLink activeClassName="active" to="/goods">{this.state.goods}</NavLink></li>
                        <li className="nav-options"><NavLink activeClassName="active" to="/comment">{this.state.comment}</NavLink></li>
                        <li className="nav-options"><NavLink activeClassName="active" to="/seller">{this.state.seller}</NavLink></li>
                    </ul>
            </nav>
        )
    }
}