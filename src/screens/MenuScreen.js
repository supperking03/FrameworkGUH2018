import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text, Image} from "react-native";
import {H1_FONT_SIZE, ON_BACKGROUND_COLOR, TEXT_FONT_BOLD} from "../config/const";
import globalStore from "../store/global";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class MenuScreen extends Component {
    constructor(props) {
        super(props);
        globalStore.register('Menu', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontFamily: TEXT_FONT_BOLD, fontSize: H1_FONT_SIZE, color: 'black'}}>Khu vui
                        chơi</Text>
                </View>
                <View style={styles.body}>
                    <ScrollView style={{width: '100%'}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('CartoonScreen')
                        }}>
                            <ImageBackground
                                style={[styles.featureItem,{marginTop : 0}]}
                                source={require('../assets/images/Group3.png')}>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("toyScreen");
                        }}>
                            <ImageBackground
                                style={styles.featureItem}
                                source={require('../assets/images/Group3.1.png')}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("ChatList");
                        }}>
                            <ImageBackground
                                style={styles.featureItem}
                                source={require('../assets/images/Group3.2.png')}>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("TvShowScreen");
                        }}>
                            <ImageBackground
                                style={styles.featureItem}
                                source={require('../assets/images/Group3.3.png')}>
                            </ImageBackground>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: height,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
            },
        header:
            {
                width: '100%',
                height: '8%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: ON_BACKGROUND_COLOR,
                borderBottomWidth: 1,
            },
        body:
            {
                width: '100%',
                height: '84%',
                marginBottom: '6%',
            },
        featureItem:
            {
                width: '94%',
                aspectRatio: 2.6,
                paddingHorizontal: '2%',
                marginTop: 20,
                alignSelf: 'center',
            },
        featureText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H1_FONT_SIZE + 4,
                color: 'white',
            },
    }
)