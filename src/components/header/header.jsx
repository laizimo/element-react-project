import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import './header.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Star from '../star/star.jsx';
import { Discount } from '../base/discount/discount.jsx';

const SUCCESS_CODE = 0;

const Title = ({ info }) => {
    return (
        <div className="info-content">
            <span className="line"></span>
            <span className="info">{info}</span>
            <span className="line"></span>
        </div>
    );
}   

const DiscountInfo = ({ supports, classMap }) => {
    const support = supports.map((item, index) => (
                <Discount type={item.type} description={item.description} key={item.description}
                typeStyle={{width: '.32rem', height: '.32rem'}} descStyle={{fontSize: '12px', lineHeight: '12px'}} />
            ));
    return (
        <ul className="discount-list">
             {support} 
        </ul>
    );
}

export class Header extends React.Component {
    constructor(props){
        super(props);

        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleHiddenClick = this.handleHiddenClick.bind(this);

        this.state = {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            isDetail: false,
            titleInfo: ['优惠信息', '商家公告']
        };
    }

    handleShowClick() {
        this.setState({
            isDetail: true
        });
    }

    handleHiddenClick() {
        this.setState({
            isDetail: false
        });
    }

    render() {
        const seller = this.props.seller;
        if(seller){
            var {avatar, supports = null, bulletin, name, score, description, deliveryTime} = this.props.seller;
        }
        const classMap = this.state.classMap;
        const [ discountInfo, sellerBulletin ] = this.state.titleInfo;
        let supportDiv, supportCount;

        if(supports) {
            supportDiv = (
                <Discount type={supports[0].type} description={supports[0].description}
                 typeStyle={{width: '.24rem', height: '.24rem'}} descStyle={{fontSize: '10px', lineHeight: '12px'}} />
            );

            supportCount = (
                <div className="support-count"  onClick={this.handleShowClick}>
                    <span className="number">{supports.length}个</span>
                    <i className="icon-keyboard_arrow_right"></i>
                </div>
            );
        }else {
            supportDiv = (
                <div></div>
            );

            supportCount = (
                <div></div>
            );
        }

        
        return (
            <header>
                    <div className="content-wrap">
                    <div className="avatar">
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <div className="content">
                        <div className="title">
                            <span className="brand"></span>
                            <span className="name">{name}</span>
                        </div>
                        <div className="description">
                            {description}/{deliveryTime}分钟送达
                        </div>
                        {supportDiv}
                    </div>
                    {supportCount}
                </div>
                <div className="bulletin-wrapper" onClick={this.handleShowClick}>
                    <span className="bulletin"></span>
                    <span className="bulletin-content">{bulletin}</span>
                    <i className="icon-keyboard_arrow_right"></i>
                </div>
                <div className="background">
                    <img src={avatar} alt="avatar"/>
                </div>
                <ReactCSSTransitionGroup transitionEnter={true} transitionEnterTimeout={500} transitionName="detail" transitionLeave={true} transitionLeaveTimeout={300}>
                    {
                        this.state.isDetail && 
                            <div className="detail">
                                <div className="detail-wrapper clearfix">
                                    <div className="detail-main">
                                        <span className="title">{name}</span>
                                        <Star score={score} size={48}/>
                                        <Title info={discountInfo}/>
                                        <DiscountInfo supports={supports} classMap={classMap}/>
                                        <Title info={sellerBulletin}/>
                                        <span className="bulletin-content">{bulletin}</span>
                                    </div>
                                </div>
                                <div className="detail-close" onClick={this.handleHiddenClick}>
                                    <i className="icon-close"></i>
                                </div>
                            </div>
                    }
                </ReactCSSTransitionGroup>
            </header>
        );
    }
}