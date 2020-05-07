import React from 'react';
import { Slider } from '@material-ui/core';

interface Props {
    onChange;
}

interface PriceRangeState {
    price: number[]
}

export default class PriceRangeSlider extends React.Component<Props, PriceRangeState>
{
    constructor(props) {
        super(props);

        this.state = {
            price: [0, 10]
        }
    }

    getValue() {
        return this.state.price;
    }

    handlePriceSlider(event, newValue) {
        this.setState({
            price: newValue
        })
    }

    handleChanged() {
        this.props.onChange();
    }

    getText(value) {
        return `${value}e`;
    }

    render (){
        return <Slider onChange={this.handlePriceSlider.bind(this)}
            onChangeCommitted={this.handleChanged.bind(this)}
            value={this.state.price} 
            valueLabelDisplay="auto"
            aria-labelledby="discrete-slider-custom"
            valueLabelFormat={this.getText} />;
    }
}
