import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {
    BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_BOLD, TEXT_FONT_REGULAR,
    TEXT_FONT_REGULAR_ITALIC
} from "../../config/const";

export default class ChatSlidingUpContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button,{fontFamily : TEXT_FONT_BOLD}]}
                    onPress={this.props.onOpenStickersPress}>
                    <Text style={styles.buttonText}>Mở Stickers</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onCancelPress}>
                    <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>

                <View
                style={{height: 75, width: "100%"}}
                />
                {/*<TouchableOpacity*/}
                    {/*style={styles.button}*/}
                    {/*onPress={this.props.onSetting2Press}*/}
                {/*>*/}
                    {/*<Text style={styles.buttonText}>Something</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity*/}
                    {/*style={[styles.button, {borderBottomWidth:1}]}*/}
                    {/*onPress={this.props.onCancelPress}*/}
                {/*>*/}
                    {/*<Text style={[styles.buttonText,{color : '#ff7675'}]}>Cancel</Text>*/}
                {/*</TouchableOpacity>*/}
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
                justifyContent : 'flex-end',
                paddingBottom : '5%',
                backgroundColor : 'white',
                borderColor : ON_SURFACE_COLOR,
                borderWidth : 1,
                marginHorizontal: '0.5%',
                alignItems: 'center',
            },
        button:
            {
                width: '100%',
                flex: 1,
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