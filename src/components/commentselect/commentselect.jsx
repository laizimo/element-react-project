import React, { Component } from 'react';
import classNames from 'classnames';
import './commentselect.less';


export const CommentSelect = ({count, isContent, handleClickAll, handleClickRecommand, handleClickComplaint, checkContent, filter}) =>  (
    <div className="comment">
        <header>
            <div className="tab-group border-1px">
                <button className={classNames('btn', 'filter-all', filter === 2 ? 'active' : '')} onClick={handleClickAll}>全部<span className="count">{count.sum}</span></button>
                <button className={classNames('btn', 'filter-recommand', filter === 0 ? 'active' : '')} onClick={handleClickRecommand}>推荐<span className="count">{count.recommand}</span></button>
                <button className={classNames('btn', 'filter-complaint', filter === 1 ? 'active' : '')} onClick={handleClickComplaint}>吐槽<span className="count">{count.complaint}</span></button>
            </div>
            <div className={classNames('check-content', isContent ? 'on' : '')} onClick={checkContent}>
                <span className="icon-check_circle"></span>
                <span className="text">只看有内容的评价</span>
            </div>
        </header>
    </div>
);
