import React, { Component } from 'react';
import axios from 'axios';
import { base_url } from '../../common/js/config.js';
import { SUCCESS_CODE } from '../../common/js/code_res.js';
import classNames from 'classnames';
import BScroll from 'better-scroll';
import { Cart } from '../cart/cart.jsx';
import AlloyTouch from 'alloytouch';
import { CartControl } from '../base/cartcontrol/cartcontrol.jsx';
import { GoodContent } from '../goodcontent/goodcontent.jsx';
import './goods.less';

class GoodItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            number: 0
        };
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
        const { food: { name, image, description, sellCount, rating, price, oldPrice }, handleAddClick, handleSubClick } = this.props;

        return (
            <div className="food">
                <img src={image} alt="foodPic" className="food-image"/>
                <div className="food-content">
                    <div className="food-name">{name}</div>
                    <div className="food-description">{description}</div>
                    <div className="food-info">
                        <span className="food-sellCount">{`月售${sellCount}份`}</span>
                        <span className="food-rating">{`好评率 ${rating}%`}</span>
                    </div>
                    <div className="food-price">
                        <span className="current">{price && `￥${price}`}</span>
                        <span className="old">{oldPrice && `￥${oldPrice}`}</span>
                    </div>
                </div>
                <CartControl number={this.getNumber(name)} name={name} price={price}
                 handleAddClick={handleAddClick} handleSubClick={handleSubClick}/> 
            </div>
        );
    }
} 

const GoodsList = props => (
    <ul className="foods-list">
        {props.foods.map((item, index) => (
            <li key={index} className="foods-item border-1px">
                <GoodItem food={item} {...props}/>
            </li>
        ))}
    </ul>
)

const GoodsWrapper = props => (
    <ul className="goods-list">
        {props.goods.map((item, index) => (
            <li className="goods-item" key={item.name}>
                <div className="goods-title">{item.name}</div>
                <GoodsList foods={item.foods} {...props}/>
            </li>
        ))}
    </ul>
)


export class Goods extends Component {
    constructor(props){
        super(props);

        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.handleSubClick = this.handleSubClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleCartClear = this.handleCartClear.bind(this);

        this.state = {
            goods: [],
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            currentIndex: 0,
            number: {},
            cart: [],
            showDetail: false,
            foodDetail: null
        }
    }

    componentDidMount() {
        axios.get(`${base_url}/api/goods`)
            .then(response => {
                const res = response.data;
                if(res.code === SUCCESS_CODE) {
                    this.setState({
                        goods: res.data
                    });
                    this._initScroll();
                }
            });
    }

    handleClickIndex(e) {
        const el = e.currentTarget;
        const index = el.getAttribute('data-id');
        const foodList = document.getElementsByClassName('goods-item');
        this.setState({
            currentIndex: index
        });
        this.foodScroll.scrollToElement(foodList[index]);
    }

    _initScroll() {
        this.menuScroll = new BScroll(this.refs.menuWrapper,{
            click: true
        });

        this.foodScroll = new BScroll(this.refs.goods, {
            click: true,
            probeType: 3
        });
    }

    handleSubClick(e) {
        let foodName = e.target;
        while(true){
            if(foodName.getAttribute('data-name')){
                foodName = foodName.getAttribute('data-name');
                break;
            }
            foodName = foodName.parentNode;
        }
        const cart = this.state.cart;
        for(const index in cart) {
            if(cart[index].name === foodName) {
                if(cart[index].count === 1) {
                    cart.splice(index, 1);
                }else{
                    cart[index].count--;
                }
            }
        }
        this.setState({
            cart: cart
        });
    }

    handleAddClick(e) {
        const foodName = e.target.parentNode.getAttribute('data-name');
        const foodPrice = e.target.parentNode.getAttribute('data-price');
        const cart = this.state.cart;
        let exist = false;
        if(cart.length === 0) {
            cart.push({name: foodName, price: foodPrice, count: 1});
        }else{
            for(const value of cart) {
                if(foodName === value.name) {
                    value.count++;
                    exist = true;
                }
            }
            if(!exist) {
                cart.push({name: foodName, price: foodPrice, count: 1});
            }
        }
        this.setState({
            cart: cart
        });
    }

    handleCartClear() {
        const cart = [];
        this.setState({
            cart: cart
        });
    }

    showDetail(food){
        this.setState({
            showDetail: true,
            foodDetail: food
        });
    }

    render() {
        const { goods, classMap, currentIndex, showDetail, foodDetail } = this.state;
        const seller = this.props.seller;
        if(seller){
            var {deliveryPrice, minPrice} = seller;
        }

        const menu = goods.length > 0 && 
            goods.map((item, index) => (
                <li key={item.name} data-id={index} className={classNames("menu-item", index == currentIndex ? 'current' : '')}
                 onClick={this.handleClickIndex}>
                    <span className="name">
                    {item.type !== -1 && <span className={classNames('type', classMap[item.type])}></span>}
                    {item.name}</span>
                </li>
            ));

        return (
            <div>
                <div className="goods">
                    <nav className="menu-wrapper" ref="menuWrapper" id="wrapper">
                        <ul className="menu-list" ref="menuTarget" id="scroller">
                            {menu}
                        </ul>
                    </nav>
                    <div className="goods-wrapper" ref="goods">
                        <GoodsWrapper goods={goods} cart={this.state.cart} handleSubClick={this.handleSubClick} handleAddClick={this.handleAddClick} />
                    </div>
                </div>
                <GoodContent show={showDetail} food={foodDetail} closeDetail={this.closeDetail} />
                <Cart deliveryPrice={deliveryPrice} cart={this.state.cart} 
                handleClear={this.handleCartClear} handleAddClick={this.handleAddClick} handleSubClick={this.handleSubClick} minPrice={minPrice} />
            </div>
        );
    }
}