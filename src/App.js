/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Route from "./screens/Global/Route";
import {pushNotifications} from "./services/index";

type Props = {};
pushNotifications.myConfigure();

export default class App extends Component<Props> {
  render() {
    return (
        <View style={{flex:1}}>
          <Route/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
