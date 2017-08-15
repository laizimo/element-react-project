import React, { Component } from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CartControl } from '../base/cartcontrol/cartcontrol.jsx';
import BScroll from 'better-scroll';
import './cart.less';


export class Cart extends Component {
    constructor(props) {
        super(props);

        this.handleShowClick = this.handleShowClick.bind(this);

        this.state = {
            isShow: false
        };
    }

    handleShowClick() {
        const isShow = this.state.isShow;
        if(isShow) {
            this.setState({
                isShow: false
            });
        }else {
            this.setState({
                isShow: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        const cart = nextProps.cart;
        const isShow = this.state.isShow;
        if(cart.length === 0){
            if(isShow){
                this.setState({
                    isShow: false
                });
            }
        }
    }

    componentDidUpdate() {
        const cart = this.props.cart;
        const isShow = this.state.isShow;
        if(cart.length !== 0){
            if(isShow){
                if(!this.cartScroll){
                    this.__initScroll();
                }else{
                    this.cartScroll.refresh();
                }
            }
        }
    }

    __initScroll() {
        const cartFood = this.refs.cartWrapper;
        this.cartScroll = new BScroll(cartFood, {
            click: true,
        });
    }

    getNumber(name) {
        const cart = this.props.cart;
        let exist = false;
        if(cart){
            for(const value of cart) {
                if(value.name === name) {
                    return value.count;
                }
            }
            if(!exist) {
                return 0;
            }
        }else{
            return 0;
        }
    }


    render() {
        const { cart, deliveryPrice, minPrice, handleClear, handleAddClick, handleSubClick } = this.props;
        const { isShow } = this.state;
        let sum = 0, price = 0, satisfy;
        if(cart) {
            for(const food of cart) {
                sum += food.count;
                price += food.price * food.count;
            }
        }

        if(price === 0) {
            satisfy = `￥${minPrice}起送`;
        }else if(price >= 0 && price < minPrice) {
            satisfy = `还差￥${minPrice - price}起送`;
        }else{
            satisfy = '去结算';
        }


        const cartFood = cart.map((item, index) => 
             (<li key={item.name} className="food-item">
                <span className="food-name">{item.name}</span>
                <span className="food-option">
                    <span className="food-price">￥{item.price * item.count}</span>
                    <CartControl number={item.count} handleSubClick={handleSubClick} handleAddClick={handleAddClick} name={item.name} price={item.price}/>
                </span>
            </li>)
        );

        return (
            <div className="shopping-container">
                <div className="shopping-cart">
                    <div className="cart">
                        <div className="cart-control">
                            <div className={classNames("cart-container", price > 0 ? 'active' : '')} onClick={price > 0 ? this.handleShowClick : ''}>
                                <i className="icon-shopping_cart"></i>
                            </div>
                            {
                                price > 0 && <span className="food-count">{sum}</span>
                            }
                        </div>
                        <div className="cart-content">
                            <span className="cart-price">￥{price}</span>
                            <span className="line border-1px"></span>
                            <span className="deliverPrice">另需配送费￥{this.props.deliveryPrice}元</span>
                        </div>
                    </div>
                    <div className={classNames("cart-settle", price >= minPrice ? 'satisfy' : '')}>
                        <span className="min-price">{satisfy}</span>
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName="fold" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {
                    isShow && 
                    <div className="shoppingcart-container">
                        <header className="shoppingcart-head border-1px">
                            <span className="shoppingcart-name">购物车</span>
                            <span className="shoppingcart-clear" onClick={handleClear}>清空</span>
                        </header>
                        <div ref="cartWrapper" className="cart-wrapper">
                            <ul className="food-list">
                                {
                                    cartFood
                                }
                            </ul>
                        </div>
                    </div>
                }
                </ReactCSSTransitionGroup>
                {
                    isShow && <div className="shoppingcart-mask"></div>
                }
            </div>
            
        );
    }
}