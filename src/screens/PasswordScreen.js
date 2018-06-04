import React, {Component} from 'react'
import {View, StyleSheet, TextInput, Text , Dimensions} from "react-native";
import {H3_FONT_SIZE, ON_BACKGROUND_COLOR, TEXT_FONT_BOLD} from "../config/const";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import globalStore from "../store/global";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class PasswordScreen extends Component {
    constructor(props) {
        super(props);

        globalStore.register('Password', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    render() {
        return (
            <View style={{flex: 1 , alignItems: 'center' , backgroundColor: 'white'}}>
                <View style={styles.textinputContainer}>
                    <Text style={styles.titleText}>Mật khẩu </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Nhập mật khẩu'}
                        placeholderTextColor={'#BDBDBD'}
                        underlineColorAndroid={ON_BACKGROUND_COLOR}
                    />
                </View>
                <PrimaryButton
                    onPress={() => {
                        this.props.navigation.navigate('Menu');
                    }}
                    color={'#4B7DE8'}
                    textColor={'white'}
                    fontFamily={TEXT_FONT_BOLD}
                    fontSize={20}
                    text={'ĐĂNG NHẬP'}
                    style={{borderRadius: 0, width: width , position: 'absolute', top : height *0.8 }}/>
            </View>
        );
    }
}


const styles=StyleSheet.create({
    textinputContainer:
        {
            width: '90%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    titleText:
        {
            fontFamily: TEXT_FONT_BOLD,
            fontSize: H3_FONT_SIZE,
            color: 'black',
            marginRight: 'auto',
        },
    textInput:
        {
            height: 100,
            width: '100%',
            marginLeft: 'auto',
            backgroundColor: 'white',
            fontSize: 20,
            color: 'transparent',
        },
})