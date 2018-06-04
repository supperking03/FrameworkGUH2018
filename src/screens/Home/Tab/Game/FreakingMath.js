import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';
import TimerCountdown from 'react-native-timer-countdown'

import {
    View,
    StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Image
} from 'react-native'
import {BACKGROUND_COLOR, ON_SURFACE_COLOR, SURFACE_COLOR, TEXT_FONT_LIGHT} from "../../../../config/const";
import globalStore from "../../../../store/global";



export default class FreakingMath extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNumber:1,
            secondNumber:1,
            rightResult : 2,
            result:2,
            operator:'+',
            currentTime:10000,
            point : 0,
            started: false,
            modalVisible:false,
            leaders:[
                {
                    fullName: 'Kien',
                    avatarImageUrl: 'https://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_101541444.jpg'
                },
                {
                    fullName: 'Nam',
                    avatarImageUrl: 'https://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_101541444.jpg'
                }
            ],
        };

    }

    check(option){
        if(option === true && this.state.result === this.state.rightResult)
        {
            this.setState(previousState => {
                return ({
                    ...previousState,
                    point: previousState.point + 1,
                })
            });
            return;
        }
        if(option === true && this.state.result !== this.state.rightResult)
        {
            this.setState(previousState => {
                return ({
                    ...previousState,
                    point: previousState.point - 1,
                })
            });
            return;
        }
        if(option === false && this.state.result === this.state.rightResult)
        {
            this.setState(previousState => {
                return ({
                    ...previousState,
                    point: previousState.point - 1,
                })
            });
            return;
        }
        if(option === false && this.state.result !== this.state.rightResult)
        {
            this.setState(previousState => {
                return ({
                    ...previousState,
                    point: previousState.point + 1,
                })
            });
            return;
        }
    }

    endTime(){
        this.setState({
            started:false,
            modalVisible: true,
        })
    }


    generateMath(){

        var first = Math.floor((Math.random() * 10) + 1);
        var second = Math.floor((Math.random() * 10) + 1);

        var rightResult = (Math.floor((Math.random() * 10) + 1) %2 == 0) ? (first + second) : (first - second)
        var result= rightResult + Math.floor((Math.random() * 5) + 1);

        this.setState({
            operator: (rightResult > first) ? '+' : '-',
            firstNumber:first,
            secondNumber:second,
            rightResult: rightResult,
            result: (Math.floor((Math.random() * 10) + 1) %2 == 0) ? result : rightResult,
        });
    }

    rePlay(){
        this.setState({
            firstNumber:1,
            secondNumber:1,
            rightResult : 2,
            result:2,
            operator:'+',
            currentTime:10000,
            point : 0,
            started: false,
            modalVisible:false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text,{marginLeft:'auto',fontSize:30}]}>{this.state.point}</Text>
                <Text style={styles.text}>{this.state.firstNumber} {this.state.operator} {this.state.secondNumber}</Text>
                <Text style={styles.text}>= {this.state.result}</Text>
                {
                    (this.state.started) ? <TimerCountdown
                        initialSecondsRemaining={5000}
                        onTick={() => console.log('tick')}
                        onTimeElapsed={() => {
                            this.endTime();
                        }}
                        allowFontScaling={true}
                        style={{ fontSize: 20 }}
                    /> : <View/>
                }
                <View style = {{flexDirection:'row', justifyContent:'center', marginTop:'auto', marginBottom:100}}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                started:true,
                            });
                            this.check(false);
                            this.generateMath();
                        }}
                        style={{
                            borderRadius: 10,
                            alignItems:'center',
                            justifyContent:'center',
                            width:100,
                            height:100,
                            backgroundColor:BACKGROUND_COLOR
                        }}
                    >
                        <Icon name="md-close" size={50}
                              color='red'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                started:true,
                            });
                            this.check(true);
                            this.generateMath();
                        }}
                        style={{
                            borderRadius: 10,
                            marginLeft:10,
                            alignItems:'center',
                            justifyContent:'center',
                            width:100,
                            height:100,
                            backgroundColor:BACKGROUND_COLOR
                        }}
                    >
                        <Icon name="md-checkmark" size={50}
                              color='blue'/>
                    </TouchableOpacity>
                </View>
                <Modal
                    style={{backgroundColor: BACKGROUND_COLOR, alignItems:'center'}}
                    isVisible={this.state.modalVisible}
                >
                    <Text style={[styles.text, {color:'red'}]}>
                        {this.state.point}
                    </Text>
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                    >
                        {
                            this.state.leaders.map(data => {
                                return (
                                    <View
                                        key={data}
                                        style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                    >
                                        <Image style={{width: 30, height: 30, borderRadius: 15}} source={{
                                            uri: data.avatarImageUrl ,
                                        }}/>
                                        <View style={{flexDirection: 'column', padding: 5}}>
                                            <Text>{data.fullName}</Text>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity
                        style={{width:50, height:50, backgroundColor: ON_SURFACE_COLOR}}
                        onPress={() => {
                        this.setState({
                            modalVisible:false,
                        })
                        this.rePlay();
                    }}>

                        <Text>REPLAY</Text>

                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1c40f',
        alignItems:'center'
    },
    text:{
        fontSize:60,
        fontWeight:'bold',
        color: 'white',
    }
});
