import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {ON_PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_VARIANT_ONE_COLOR} from "../../config/const";

const propTypes = ({
    style: PropTypes.any,
    markerStyle: PropTypes.any,
    onValuesChange: PropTypes.func,
    sliderLength: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    selectedStyle: PropTypes.any
});

const defaultProps = {
    style: {},
    markerStyle: {},

    selectedStyle: {backgroundColor: PRIMARY_COLOR},
    sliderLength: 300,
    min: 1,
    max: 100,
    onValuesChange() {
    },
};


export default class SingleSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.onValuesChange = this.onValuesChange.bind(this);
        this.renderMarker = this.renderMarker.bind(this);
    }

    onValuesChange(values) {
        const {onValuesChange} = this.props;
        onValuesChange(values);
        this.renderMarker = this.renderMarker.bind(this);
    }

    renderMarker() {
        return (
            <View style={[styles.marker, this.props.markerStyle]}/>
        )
    }

    render() {
        const {style, sliderLength, min, max} = this.props;
        return (
            <MultiSlider customMarker={this.renderMarker}
                         onValuesChange={this.onValuesChange}
                         sliderLength={sliderLength}
                         min={min} max={max}
                         selectedStyle={this.props.selectedStyle}
                         trackStyle={style}
            />

        )
    }
};

SingleSlider.propTypes = propTypes;
SingleSlider.defaultProps = defaultProps;

const styles = StyleSheet.create({
    marker: {
        height: 30, aspectRatio: 1, borderRadius: 100, backgroundColor: ON_PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2
    }
});