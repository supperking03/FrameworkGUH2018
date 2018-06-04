import React from 'react'

import {TabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Icon} from "react-native-elements";
import FeedsScreen from "../FeedsScreen";
import {NavigationComponent} from "react-native-material-bottom-navigation-performance";
import ProfileScreen from "./Tab/Profile/ProfileScreen";
import ProfileTab from "./Tab/Profile/ProfileStack";
import ChatTab from "./Tab/Chat/ChatStack";
import globalStore from "../../store/global";


export const tabNavigatorHeight = 50;


export const HomeTabNavigation = TabNavigator(
    {
        Feeds: {screen: FeedsScreen},
        ChatList: {screen: ChatTab},
        Profile: {screen: ProfileTab},
    },
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                innerStyle: {
                    elevation: 10,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderWidth: 0.2,
                    borderColor: "#95a5a6",
                    height: tabNavigatorHeight
                },
                labelColor: '#2c3e50',
                activeLabelColor: '#27ae60',
                backgroundColor: 'white',
                rippleColor: 'black',
                shifting: false,
                tabs: {
                    Feeds: {
                        label: "Newfeeds",
                        icon: (<Icon size={24} name="map" color="#2c3e50"/>),
                        activeIcon: (<Icon size={24} name="map" color="#27ae60"/>)
                    },
                    ChatList: {
                        label: "Chat",
                        icon: (<Ionicons size={24} name="md-chatboxes" color="#2c3e50"/>),
                        activeIcon: (<Ionicons size={24} name="md-chatboxes" color="#27ae60"/>)
                    },
                    Profile: {
                        label: "Profile",
                        icon: (<Ionicons size={24} name="md-person" color="#2c3e50"/>),
                        activeIcon: (<Ionicons size={24} name="md-person" color="#27ae60"/>)
                    },
                }
            },
        },
        navigationOptions: ({navigation}) => ({
            tabBarOnPress: (scene, jumpToIndex) => {
                switch (scene.index) {
                    case 1:
                    {
                        globalStore.getStateOf('ListChat')._this.LoadList();
                    }break;

                    case 2 : {
                        //globalStore.getStateOf('Profile')._this.LoadProfile();
                    }
                        break;
                    case 3 : {

                    }
                        break;
                    case 4 : {

                    }
                        break;
                }
                jumpToIndex(scene.index);
            },
        }),

    }
);