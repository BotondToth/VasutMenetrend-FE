import React from 'react';
import { Slider } from '@material-ui/core';

interface PriceRangeState {
    price: number[]
}

export default class PriceRangeSlider extends React.Component<any, PriceRangeState>
{
    constructor(props) {
        super(props);

        this.state = {
            price: [0, 10]
        }
    }

    handlePriceSlider(event, newValue) {
        this.setState({
            price: newValue
        })
    }

    getText(value) {
        return `${value}e`;
    }

    render (){
        return <Slider onChange={this.handlePriceSlider.bind(this)} 
            value={this.state.price} 
            valueLabelDisplay="auto"
            aria-labelledby="discrete-slider-custom"
            valueLabelFormat={this.getText} />;
    }
}
