import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Text, Image} from "react-native";
import {H1_FONT_SIZE, ON_BACKGROUND_COLOR, TEXT_FONT_BOLD} from "../config/const";
import globalStore from "../store/global";
import {Icon} from "react-native-elements";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ParentCheckScreen extends Component {
    constructor(props) {
        super(props);
        globalStore.register('ParentMenu', (s) => this.setState(s),
            () => {
                return this.state
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{uri: 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/33532235_668780196798992_7612469244533407744_n.png?_nc_cat=0&oh=46433d0444ec932348e765a99ab8c491&oe=5B81332B'}}
                    style={styles.header}>
                    <TouchableOpacity
                        style={{marginRight: 'auto'}}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Icon
                            name={"chevron-left"}
                            size={35}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.body}>
                    <ScrollView style={{width: '100%'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('History',{category : 'cartoon'})
                            }}>
                            <ImageBackground
                                style={[styles.featureItem,{marginTop : 0}]}
                                source={require('../assets/images/Group3.png')}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('History',{category : 'toy'})
                            }}>
                            <ImageBackground
                                style={styles.featureItem}
                                source={require('../assets/images/Group3.1.png')}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('History',{category : 'game'})
                            }}>
                            <ImageBackground
                                style={styles.featureItem}
                                source={require('../assets/images/Group3.2.png')}>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('History',{category : 'TV'})
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
                height: '12%',
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
                marginBottom: '6%'
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