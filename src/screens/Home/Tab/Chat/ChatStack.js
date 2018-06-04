import {
    StackNavigator,
} from 'react-navigation';
import React, {Component} from "react";
import {View} from "react-native";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";
import ChatMenu from "./ChatMenu";

const ChatStack = StackNavigator({
    ListChat: {
        screen: ChatListScreen,
        navigationOptions: {
            header: null

        }
    },
});

export default class ChatTab extends Component {
    constructor(props)
    {
        super(props);
    }

    static router = ChatStack.router;
    render() {
        return (
            <View style={{flex : 1}}>
                <ChatStack navigation={this.props.navigation}/>
            </View>
        );
    }
}