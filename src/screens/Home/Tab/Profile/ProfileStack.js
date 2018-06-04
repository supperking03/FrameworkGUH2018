import {
    StackNavigator,
} from 'react-navigation';
import ProfileScreen from "./ProfileScreen";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import React, {Component} from "react";
import {View} from "react-native";

const ProfileStack = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null

        }
    },
    Setting: {
        screen: ProfileSettingsScreen,
        navigationOptions: {
            header: null
        }
    },
});

export default class ProfileTab extends Component {
    constructor(props)
    {
        super(props);
    }

    static router = ProfileStack.router;
    render() {
        return (
            <View style={{flex : 1}}>
                <ProfileStack navigation={this.props.navigation}/>
            </View>
        );
    }
}