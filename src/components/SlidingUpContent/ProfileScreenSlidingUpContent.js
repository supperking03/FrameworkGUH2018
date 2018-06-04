import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {
    BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_REGULAR,
    TEXT_FONT_REGULAR_ITALIC
} from "../../config/const";

export default class ProfileScreenSlidingUpContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onUploadAvatarPress}
                >
                    <Text style={styles.buttonText}>Change Avatar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onSettingPress}
                    >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onLogoutPress}
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button,{backgroundColor : PRIMARY_COLOR}]}
                    onPress={this.props.onCancelPress}
                >
                    <Text style={[styles.buttonText,{color : BACKGROUND_COLOR}]}>Cancel</Text>
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
                justifyContent : 'flex-end',
                paddingBottom : '15%',
                borderTopRightRadius : 10,
                borderTopLeftRadius  : 10,
                backgroundColor : 'rgba(255,255,255,0.9)',
                borderColor : ON_SURFACE_COLOR,
                borderWidth : 1,
                marginHorizontal: '0.5%',
                alignItems: 'center',
            },
        button:
            {
                width: '100%',
                height: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: ON_SURFACE_COLOR,
                borderTopWidth: 1,
                marginTop: 1,
            },
        buttonText:{
            fontFamily : TEXT_FONT_REGULAR,
            fontSize : PARAGRAPH_FONT_SIZE,
        },
    }
)