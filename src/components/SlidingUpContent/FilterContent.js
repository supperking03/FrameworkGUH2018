import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from "react-native";
import {
    BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_BOLD
} from "../../config/const";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SingleSlider from "../MultiSlider/SingleSlider";
import TwoMarkersSlider from "../MultiSlider/TwoMarkersSlider";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";

export default class FilterContent extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                distance: 0,
                minAge: 0,
                maxAge: 100,
                genderOption: 'All',
            }
    }

    onValuesChange(value) {
        this.setState({distance: value})
    }

    onValuesChangeAge(value) {
        this.setState({minAge: value[0], maxAge: value[1]})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Filter</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{color: 'white'}}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.filterContent}>
                        <View style={styles.filterHeader}>
                            <Text style={styles.subText}>Distance</Text>
                            <Text style={styles.subText}>{this.state.distance} km</Text>
                        </View>
                        <SingleSlider
                            min={1}
                            max={10}
                            markerStyle={{height: '75%'}}
                            sliderLength={Dimensions.get('window').width * 0.9}
                            onValuesChange={this.onValuesChange.bind(this)}

                        />
                    </View>
                    <View style={styles.filterContent}>
                        <View style={styles.filterHeader}>
                            <Text style={styles.subText}>Age</Text>
                            <Text style={styles.subText}>{this.state.minAge}-{this.state.maxAge}</Text>
                        </View>
                        <TwoMarkersSlider
                            min={1}
                            max={100}
                            markerStyle={{height: '75%'}}
                            sliderLength={Dimensions.get('window').width * 0.9}
                            onValuesChange={this.onValuesChangeAge.bind(this)}
                        />
                    </View>
                    <View style={[styles.filterContent, {paddingHorizontal: '5%',paddingVertical : '4%'}]}>
                        <View style={[styles.filterHeader, {height: '30%',paddingHorizontal: 0}]}>
                            <Text style={styles.subText}>Gender</Text>
                            <View/>
                        </View>
                        <RadioButtonGroup
                            options={['All', 'Boys', 'Girls']}
                            onChangeOption={(option) => {
                                this.setState({genderOption: option})
                            }}/>
                    </View>

                </View>
                <View style={styles.footer}>
                    <PrimaryButton
                        style={{height: '60%', borderRadius: 100}}
                        text={'Apply'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: BACKGROUND_COLOR,
            },
        header:
            {
                width: '100%',
                height: '10%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '5%',
                paddingRight: '5%',
            },
        headerText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: PARAGRAPH_FONT_SIZE,
                color: 'black',
            },
        button:
            {
                height: '60%',
                aspectRatio: 1,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: ON_SURFACE_COLOR,
            },
        body:
            {
                width: '100%',
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        footer:
            {
                width: '100%',
                height: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: '5%',
            },
        filterContent:
            {
                width: '100%',
                height: '33%',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
        filterHeader:
            {
                width: '100%',
                height: '50%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '5%',
            },
        subText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: SUBTEXT_FONT_SIZE + 2,
                color: 'black',
            }

    }
);