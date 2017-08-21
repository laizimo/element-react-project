import React, { Component } from 'react';
import { CommentSelect } from '../commentselect/commentselect.jsx';
import { CartControl } from '../base/cartcontrol/cartcontrol.jsx';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './goodcontent.less';


export class GoodContent extends Component {
    constructor(props){
        super(props);

        this.handleClickAll = this.handleClickAll.bind(this);
        this.handleClickComplaint = this.handleClickComplaint.bind(this);
        this.handleClickRecommand = this.handleClickRecommand.bind(this);
        this.checkContent = this.checkContent.bind(this);

        this.state = {
            filter: 2,
            isContent: false
        };
    }


    handleClickAll(){
        this.setState({
            filter : 2
        });
    }

    handleClickRecommand(){
        this.setState({
            filter: 0
        });
    }

    handleClickComplaint(){
        this.setState({
            filter: 1,
            isContent: false
        });
    }

    filterRate(filter, ratings){
        switch(filter){
            case 0: 
                return ratings.filter(item => item.rateType === 0);
            case 1:
                return ratings.filter(item => item.rateType === 1);
            case 2:
                return ratings;
            default:
                return ratings;
        }
    }
    getRateCount(ratings){
        let count = {
            sum: 0,
            recommand: 0,
            complaint: 0
        };
        count.recommand = ratings.filter(item => item.rateType === 0).length;
        count.complaint = ratings.filter(item => item.rateType === 1).length;
        count.sum = count.recommand + count.complaint;
        return count;
    }

    getRateContent(isContent, ratings){
        if(isContent){
            return ratings.filter(i => i.text === '');
        }else{
            return ratings;
        }
    }

    checkContent(){
        this.setState((prevState) => {
            isContent: !prevState.isContent
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
        if(this.props.food){
            var { image, name, sellCount, rating, price, oldPrice, info, ratings } = this.props.food;
        }
        const showDetail = this.props.show;
        const closeDetail = this.props.closeDetail;
        const { cart , handleAddClick, handleSubClick, handleAdd } = this.props;
        const { filter, isContent } = this.state;

        
        const ratingsCount = ratings && this.getRateCount(ratings);
        const filterRate = ratings && this.filterRate(filter, ratings);
        const rateContent = ratings && this.getRateContent(isContent, filterRate);

        const number = this.getNumber(name);

        const rateList = ratings && rateContent.map((item, index) => (
            <li key={item.username} className="rate-item">
                <div className="rate-content">
                    <div className="rate-time">{new Date().setTime(item.rateTime)}</div>
                    <div className={classNames('rate-text', item.rateType === 0 ? 'on' : 'up')}>
                        <span className={item.rateType === 0 ? "icon-thumb_up" : "icon-thumb_down"}></span>
                        <span className="text">{item.text}</span>
                    </div>
                </div>
                <div className="rate-user">
                    <span className="user-name">{item.username}</span>
                    <img src={item.avatar} className="user-avatar" alt="user avater" />
                </div>
            </li>
        ));

        return (
            <ReactCSSTransitionGroup transitionName="content" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
            showDetail && <div className="food-detail">
                <header>
                    <span className="close" onClick={closeDetail}>
                        <i className="icon-arrow_lift"></i>
                    </span>
                    <img src={image} alt="food image" className="food-image" />
                    <div className="food-content">
                        <div className="food-title">{name}</div>
                        <div className="food-record">
                            <span>月售{sellCount}份</span>
                            <span>好评率{rating}</span>
                        </div>
                        <div className="food-sell">
                            <span className="food-price">{price}</span>
                            <span className="food-oldprice">{oldPrice}</span>
                        </div>
                        <CartControl number={number} handleAddClick={handleAddClick} 
                            handleSubClick={handleSubClick} name={name} price={price}/>
                        <ReactCSSTransitionGroup transitionName="cartbtn" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        {
                            number === 0 && 
                                <button className="add-cart" onClick={() => {
                                    handleAdd(name, price);
                                }}>加入购物车</button>
                        }
                        </ReactCSSTransitionGroup>
                    </div>
                </header>
                <div className="content">
                    <div className="title">商品介绍</div>
                    <div className="food-info">{info}</div>
                </div>
                <div className="content">
                    <div className="title">商品评价</div>
                    <CommentSelect filter={filter} count={ratingsCount} handleClickAll={this.handleClickAll} 
                        handleClickRecommand={this.handleClickRecommand} handleClickComplaint={this.handleClickComplaint} isContent={isContent} checkContent={this.checkContent}/>
                </div>
                <ul className="rate-list">
                    {
                        rateList
                    }
                </ul>
                <div className="block">
                </div>
            </div>
            }
            </ReactCSSTransitionGroup>
        )
    }
}