import React, { Component } from 'react';


export class GoodContent extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        const { image } = this.props.food;
    }
}