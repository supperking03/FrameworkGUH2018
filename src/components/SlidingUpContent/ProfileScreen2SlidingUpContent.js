import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {
    BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_BOLD, TEXT_FONT_REGULAR,
    TEXT_FONT_REGULAR_ITALIC
} from "../../config/const";

export default class ProfileScreen2SlidingUpContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onLoginPress}
                >
                    <Text style={[styles.buttonText,{fontFamily : TEXT_FONT_BOLD}]}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onParentViewPress}
                >
                    <Text style={styles.buttonText}>Xem hoạt động</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onSettingPress}
                >
                    <Text style={styles.buttonText}>Chỉnh sửa</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onPressDelete}
                >
                    <Text style={[styles.buttonText,{color : '#ff7675'}]}>Xóa</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button, {borderBottomWidth:1}]}
                    onPress={this.props.onCancelPress}
                >
                    <Text style={[styles.buttonText,{color : '#FFCD52'}]}>Hủy</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '99%',
                height: '100%',
                justifyContent : 'space-between',
                paddingBottom : '5%',
                backgroundColor : 'white',
                borderColor : ON_SURFACE_COLOR,
                borderWidth : 1,
                alignItems: 'center',
            },
        button:
            {
                width: '100%',
                height: '19%',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: ON_SURFACE_COLOR,
                borderTopWidth: 1,
                marginTop: 1,
            },
        buttonText:{
            fontFamily : TEXT_FONT_REGULAR,
            fontSize : PARAGRAPH_FONT_SIZE,
            color: 'black'
        },
    }
)