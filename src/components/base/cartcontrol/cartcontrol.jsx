import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './cartcontrol.less';


export const CartControl = props => {
    return (
        <div className="cart-control" data-name={props.name} data-price={props.price}>
            <ReactCSSTransitionGroup transitionName="sub" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
                props.number !== 0 && <div className="sub-number">
                <span className="sub icon-remove_circle_outline" onClick={props.handleSubClick}></span>
                <span className="number">{props.number}</span>
                </div>
            }
            </ReactCSSTransitionGroup>
            <span className="add icon-add_circle" onClick={props.handleAddClick}></span>
        </div>
    );
}