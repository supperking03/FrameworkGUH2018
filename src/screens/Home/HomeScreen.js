import React, {Component} from 'react';
import {
    View
} from 'react-native'
import {HomeTabNavigation} from "./HomeTabNavigation";
import globalStore from "../../store/global";


export default class HomeScreen extends Component {
    constructor(props)
    {
        super(props);

        globalStore.register('HomeScreen', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    static router = HomeTabNavigation.router;

    render() {
        return (
            <View style={{flex:1}}>
                <HomeTabNavigation navigation={this.props.navigation}/>
            </View>
        );
    }
}
