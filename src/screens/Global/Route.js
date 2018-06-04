import React, {Component} from "react";
import {View} from "react-native";
import {GlobalStack} from "./GlobalStack";
import {stackNavigate, Realm} from "../../store/realm";
import globalStore from "../../store/global";
import {MainStack} from "./MainStack";

export default class Route extends Component {
    constructor(props) {
        super(props)
        this.navigation = [];
        this.prop = [];
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MainStack
                    onNavigationStateChange={(prevState, newState) => {
                    this._getCurrentRouteName(newState)
                }}/>
            </View>
        );
    }

    _getCurrentRouteName(navState) {
        if (navState.hasOwnProperty('index')) {
            this._getCurrentRouteName(navState.routes[navState.index])
        } else {
            console.log(this.navigation);
            if (this.navigation[this.navigation.length - 1] !== navState.routeName) {
                console.log(this.navigation[this.navigation.length - 1]);
                console.log(`current : ${navState.routeName}`);
                if (this.navigation[this.navigation.length - 2] === navState.routeName) {
                    this.navigation.pop();
                    this.prop.pop();
                    var prevRoute = this.navigation[this.navigation.length - 1];
                    console.log(`----------`)
                    console.log(globalStore.loadData(prevRoute));
                    globalStore.setStateOf(prevRoute, {...globalStore.loadData(prevRoute)});
                }
                else {
                    this.navigation.push(navState.routeName);
                    if (navState.params === undefined)
                        this.prop.push({});
                    else
                        this.prop.push(navState.params)
                }
                switch (navState.routeName) {
                    case 'ListChat' : {
                        this.navigation = ['ListChat'];
                        this.prop = [{}];
                    }
                        ;
                        break;
                    case 'Feeds' : {
                        this.navigation = ['Feeds'];
                        this.prop = [{}];
                    }
                        ;
                        break;
                    case 'Profile' : {
                        this.navigation = ['Profile'];
                        this.prop = [{}];
                    }
                        ;
                        break;
                    case 'Splash': {
                        this.navigation = ['Profile'];
                        this.prop = [{}];
                    }
                        ;
                        break;
                }
                // const realm = new Realm(stackNavigate);
                // realm.write(() => {
                //         if (realm.objects(stackNavigate.schema[0].name).length === 1) {
                //             realm.delete(realm.objects(stackNavigate.schema[0].name));
                //         }
                //     }
                // );
                // realm.write(
                //     () => {
                //         var navigate = JSON.stringify(this.navigation);
                //         var props = JSON.stringify(this.prop);
                //         realm.create(stackNavigate.schema[0].name, {screens: navigate,props : props});
                //     });
                // realm.close()
            }
        }
    }
}