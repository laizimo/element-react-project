import React, { Component } from 'react';
import classNames from 'classnames';
import './star.less';

const LENGTH = 5;
const TYPE_ON = 'on';
const TYPE_HALF = 'half';
const TYPE_OFF = 'off';

function starJudge(score) {
    const res = [];
    const onNumber = Math.floor(score);
    for(let i = 0; i < onNumber; i++){
        res.push(TYPE_ON);
    }
    if(score >= onNumber + 0.5) {
        res.push(TYPE_HALF);
        for(let i = 0; i < LENGTH - onNumber - 1; i++) {
            res.push(TYPE_OFF);
        }
    }else {
        for(let i = 0; i < LENGTH - onNumber; i++) {
            res.push(TYPE_OFF);
        }
    }
    return res;
}

const Star = ({ size, score }) => {
    const classMap = starJudge(score);
    console.log(classMap);
    const starSize = 'star-' + size;

    return (
        <ul className="stars">
            {classMap.map((item, index) => (
                <li key={index} className={classNames(starSize, `${starSize}-${item}`)}></li>
            ))}
        </ul>
    );
}

export default Star;