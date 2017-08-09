import React, { Component } from 'react';
import './cartcontrol.less';


export const CartControl = props => {
    return (
        <div className="cart-control" data-name={props.name} data-price={props.price}>
            {
                props.number !== 0 && <div className="sub-number">
                <span className="sub icon-remove_circle_outline" onClick={props.handleSubClick}></span>
                <span className="number">{props.number}</span>
                </div>
            }
            <span className="add icon-add_circle" onClick={props.handleAddClick}></span>
        </div>
    );
}