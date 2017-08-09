import React, { Component } from 'react';
import {
    BrowserRouter as Router, Link, Route, Redirect, withRouter, Switch
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Header } from './components/header/header.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import { Goods } from './components/goods/goods.jsx';
import { base_url } from './common/js/config.js';
import { SUCCESS_CODE } from './common/js/code_res.js';
import axios from 'axios';
import './App.less';


const Comment = () => (
    <h2>I'm Comment</h2>
)

const Seller = () => (
    <h2>I'm Seller</h2>
    // <div>
    //     <ReactCssTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
    //         <h2>{"I'm seller"}</h2>
    //     </ReactCssTransitionGroup>
    // </div>
)



export class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            seller: null,
        }
    }

    componentDidMount() {
        const url = base_url + '/api/seller';
        axios.get(url)
            .then(response => {
                const res = response.data;
                if(res.code === SUCCESS_CODE) {
                    this.setState({
                        seller: res.data
                    });
                }
            });
    }

    render() {
        const seller = this.state.seller;
        return (
            <div>
                <Header seller={seller} />
                <Router>
                    <div>
                        <Navbar/>

                        <Redirect from="/" to="/goods"/>
                        <Route path="/goods" exact seller={this.state.seller} render={props => (
                            <Goods seller={seller}/>
                        )}/>
                        <Route path="/comment" component={Comment}/>
                        <Route path="/seller" component={Seller}/>
                    </div>
                </Router>
            </div>
        );
    }
}
