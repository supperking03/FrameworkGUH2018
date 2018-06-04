import React, {Component} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {BACKGROUND_COLOR, PRIMARY_COLOR} from "../../config/const";
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get('window').width;
export default class MapSlidingUpContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Animatable.View
                    transition="marginLeft"
                    style={[styles.mainView, {marginLeft: this.state.currentPosition * -width}]}
                    ref={main => this._main = main}>
                    <View style={{width: width, height: '100%', backgroundColor: 'red'}}/>
                    <View style={{width: width, height: '100%', backgroundColor: 'blue'}}/>
                    <View style={{width: width, height: '100%', backgroundColor: 'green'}}/>
                </Animatable.View>
                <View style={{width: '100%', height: '50%', justifyContent: 'space-between', flexDirection: 'row' , paddingHorizontal: '5%', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: PRIMARY_COLOR
                        }}
                        onPress={() => {
                            if (this.state.currentPosition > 0) {
                                this._main.transitionTo({marginLeft: -width}, 300);
                                let temp = this.state.currentPosition - 1;
                                this.setState({currentPosition: temp});
                            }
                        }}>
                        <Text style={{fontSize: 20, color: 'white'}}> Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: PRIMARY_COLOR
                        }}
                        onPress={() => {
                            if (this.state.currentPosition < 3) {
                                this._main.transitionTo({marginLeft: -width}, 300);
                                let temp = this.state.currentPosition + 1;
                                this.setState({currentPosition: temp});
                            }

                        }}>
                        <Text style={{fontSize: 20, color: 'white'}}>Next </Text>
                    </TouchableOpacity>
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
        mainView:
            {
                width: '300%',
                flexDirection: 'row',
                height: '50%',
            }
    }
);