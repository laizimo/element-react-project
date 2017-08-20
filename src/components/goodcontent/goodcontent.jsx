import React, { Component } from 'react';
import CommentSelect from '../comment/comment.jsx';
import classNames from 'classnames';


export class GoodContent extends Component {
    constructor(props){
        super(props);

        this.handleClickAll = this.handleClickAll.bind(this);
        this.handleClickComplaint = this.handleClickComplaint.bind(this);
        this.handleClickRecommand = this.handleClickRecommand.bind(this);
        this.checkContent = this.checkContent.bind(this);

        this.state = {
            filter: 2
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
        if(!isContent){
            return ratings.filter(i => i.text !== '');
        }else{
            return ratings;
        }
    }

    checkContent(){
        this.setState((prevState) => {
            isContent: !prevState.isContent
        });
    }

    render() {
        const { image, name, sellCount, ratings, price, oldPrice, info, ratings } = this.props.food;
        const showDetail = this.props.show;
        const closeDetail = this.props.closeDetail;
        const { filter, isContent } = this.state;

        const ratingsCount = this.getRateCount(ratings);
        const filterRate = this.filterRate(filter, ratings);
        const rateContent = this.getRateContent(isContent, filterRate);


        const rateList = rateContent.maps((item, index) => {
            <li key={item.username} className="rate-item">
                <div className="rate-content">
                    <div className="rate-time">{new Date().setTime(item.rateTime)}</div>
                    <div className={classNames('rate-text', item.rateType === 0 ? 'on' : 'up')}>
                        <span className={item.rateType === 0 ? "icon-thumb_up" : "icon-thumb_down"}></span>
                        <span className="text">{item.text}</span>
                    </div>
                </div>
            </li>
        })

        return (
            showDetail && <div className="food-detail">
                <header>
                    <span className="close" onClick={closeDetail}>
                        <i className="icon-close"></i>
                    </span>
                    <img src={image} alt="food image" className="food-image" />
                    <div className="food-content">
                        <div className="food-title">{name}</div>
                        <span className="food-sellcount">月售{sellCount}份</span>
                        <span className="food-rating">好评率{rating}</span>
                    </div>
                    <div className="food-sell">
                        <span className="food-price">{price}</span>
                        <span className="food-oldprice">{oldPrice}</span>
                        <button className="add-Cart">加入购物车</button>
                    </div>
                </header>
                <div className="content">
                    <div className="title">商品介绍</div>
                    <div className="food-info">{info}</div>
                </div>
                <div className="content">
                    <div className="title">商品评价</div>
                    <CommentSelect count={ratingsCount} handleClickAll={this.handleClickAll} 
                        handleClickRecommand={this.handleClickRecommand} handleClickComplaint={this.handleClickComplaint} isContent checkContent={this.checkContent}/>
                </div>
                <ul className="rate-list">
                    {
                        rateList
                    }
                </ul>
            </div>
        )
    }
}