import React, { Component } from 'react';
import classNames from 'classnames';
import './discount.less';

const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

export const Discount = props => (
    <div className="support">
        <span className={classNames('type', classMap[props.type])} style={props.typeStyle}></span>
        <span className="description" style={props.descStyle}>{props.description}</span>
    </div>
);
