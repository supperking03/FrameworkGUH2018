import {
    StackNavigator,
} from 'react-navigation';
import React, {Component} from "react";
import LoginScreen from "../Login/LoginScreen";
import HomeScreen from "../Home/HomeScreen";
import SearchScreen from "../SearchScreen/SearchScreen";
import OtherProfileScreen from "../Home/Tab/Profile/OtherProfileScreen";
import ChatScreen from "../Home/Tab/Chat/ChatScreen";
import ChatMenu from "../Home/Tab/Chat/ChatMenu";
import PhotoViewScreen from "../Home/Tab/Profile/PhotoViewScreen";
import PhotoGallery from "../Home/Tab/Profile/PhotoGallery";
import SplashScreen from "../SplashScreen/SplashScreen";
import AddToChatRoom from "../Home/Tab/Chat/AddToChatRoom";
import DetailsToyScreen from "../ToyScreens/DetailsToyScreen";
import ProfileScreen2 from "../ProfileScreen2";
import ProfileSetting2 from "../../ProfileSetting2";
import globalStore from "../../store/global";

export const GlobalStack = StackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        }
    },

    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: null
        }
    },

    OtherProfile:
        {
            screen: OtherProfileScreen,
            navigationOptions: {
                header: null
            }
        },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    PhotoView: {
        screen: PhotoViewScreen,
        navigationOptions: {
            header: null
        }
    },
    Gallery:
        {
            screen: PhotoGallery,
            navigationOptions: {
                header: null,
            }
        },
    ChatDetail: {
        screen: ChatScreen,
        navigationOptions: {
            header: null
        }
    },
    ChatMenu: {
        screen: ChatMenu,
        navigationOptions: {
            header: null
        }
    },
    addMember: {
        screen: AddToChatRoom,
        navigationOptions: {
            header: null
        }
    },
});

const prevGetStateForAction = GlobalStack.router.getStateForAction;

GlobalStack.router.getStateForAction = (action, state) => {
    // Do not allow to go back from Home


    // Do not allow to go back to Login
    if (action.type === 'Navigation/BACK' && state) {
        const newRoutes = state.routes.filter(r => (r.routeName !== 'Login' && r.routeName !== 'Splash' && globalStore.initScreen == true));
        const newIndex = newRoutes.length - 1;
        return prevGetStateForAction(action, {index: newIndex, routes: newRoutes});
    }
    ;

    return prevGetStateForAction(action, state);
};


GlobalStack.onNa

