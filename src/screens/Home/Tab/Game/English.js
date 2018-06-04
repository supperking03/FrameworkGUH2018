import React, {Component} from 'react';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TimerCountdown from 'react-native-timer-countdown'

import {
    View,
    StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Image,Animated
} from 'react-native'
import {BACKGROUND_COLOR, ON_SURFACE_COLOR, SURFACE_COLOR, TEXT_FONT_LIGHT} from "../../../../config/const";
import globalStore from "../../../../store/global";



export default class English extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAnswer:'dog',
            currentTime:500000,
            started:true,
            modalVisible:false,
            progressValue : new Animated.Value(200),
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
            answers:[
                {
                    key:'dog',
                    url:'http://www.heloisaamante.com.br/press/wp-content/uploads/2018/02/goldie.jpg'
                },
                {
                    key:'cat',
                    url:'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350'
                },
                {
                    key:'mouse',
                    url:'https://cdn.shopify.com/s/files/1/0748/9103/products/5561-Mouse-white.jpg?v=1426884286',
                },
                {
                    key:'fish',
                    url:'https://i.pinimg.com/736x/be/88/35/be8835c90fe0e0b070fcccade43684aa--comet-goldfish-fantail-goldfish.jpg',
                }
            ]
        };


    };

    pickAnswer(item){
        if(item === this.state.currentAnswer)
        {
            Animated.timing(
                this.state.progressValue,
                {
                    toValue: 200,
                    duration: 0,
                }
            ).start();
            Animated.timing(
                this.state.progressValue,
                {
                    toValue: 0,
                    duration: 5000,
                }
            ).start();
        }
        else {
            this.setState(
                {
                    modalVisible:true,
                }
            )
        }

    }

    endTime(){
        this.setState({
            progressValue : new Animated.Value(200),
            started:false,
            modalVisible: true,
        });

    }

    rePlay(){
        Animated.timing(
            this.state.progressValue,
            {
                toValue: 200,
                duration: 0,
            }
        ).start();
        Animated.timing(
            this.state.progressValue,
            {
                toValue: 0,
                duration: 5000,
            }
        ).start();
        this.setState({
            currentAnswer:'dog',
            started:true,
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
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{width:this.state.progressValue, height:25, backgroundColor: 'red', borderRadius:10}}>

                </Animated.View>
                <Text style={styles.text}>
                    DOG
                </Text>
                {
                    (this.state.started) ? <TimerCountdown
                        initialSecondsRemaining={500000}
                        onTick={() => {
                            if (this.state.progressValue._value == 0)
                            {
                                this.setState({
                                    started:false,
                                    modalVisible:true,
                                })
                            }
                        }}
                        onTimeElapsed={() => {
                            this.endTime();
                        }}
                        allowFontScaling={true}
                        style={{ fontSize: 0 }}
                    /> : <View/>
                }
                <ScrollView
                >
                    {
                        this.state.answers.map(data => {
                            return (
                                <TouchableOpacity
                                    style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                    onPress={() => {
                                        this.pickAnswer(data.key);
                                    }}
                                >
                                    <Image style={{width: 100, height: 100, borderRadius: 50}} source={{
                                        uri: data.url ,
                                    }}/>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                <Modal
                    style={{backgroundColor: BACKGROUND_COLOR, alignItems:'center'}}
                    isVisible={this.state.modalVisible}
                >
                    <Text style={[styles.text, {color:'red'}]}>
                        {this.state.point}
                    </Text>
                    <ScrollView
                        keyboardShouldPersistTaps={true}
                    >
                        {
                            this.state.leaders.map(data => {
                                return (
                                    <View
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
                                started:false,
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
        backgroundColor: '#f39c12',
        alignItems:'center'
    },
    text:{
        fontSize:60,
        fontWeight:'bold',
        color: 'white',
    }
});
