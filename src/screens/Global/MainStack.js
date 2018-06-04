import ProfileScreen2 from "../ProfileScreen2";
import ProfileSetting2 from "../../ProfileSetting2";
import {StackNavigator} from "react-navigation";
import LoginScreen from "../Login/LoginScreen";
import DetailsToyScreen from "../ToyScreens/DetailsToyScreen";
import ToysFeedScreen from "../ToyScreens/ToysFeedScreen";
import MenuScreen from "../MenuScreen";
import ParentCheckScreen from "../ParentCheckScreen";
import ChatScreen from "../Home/Tab/Chat/ChatScreen";
import ChatListScreen from "../Home/Tab/Chat/ChatListScreen";
import SplashScreen from "../SplashScreen/SplashScreen";
import {GlobalStack} from "./GlobalStack";
import HistoryDetail from "../HistoryDetail";
import CartoonScreen from "../Cartoon/CartoonScreen";
import VideoScreen from "../Cartoon/VideoScreen";
import TvShowScreen from "../Cartoon/TvShowScreen";
import PasswordScreen from "../PasswordScreen";
import globalStore from "../../store/global";

export const MainStack = StackNavigator({

    Splash:
        {
            screen: SplashScreen,
            navigationOptions: {
                header: null,
            }
        },

    Login:
        {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            }
        },
    Profile:
        {
            screen: ProfileScreen2,
            navigationOptions: {
                header: null,
            }
        },

    Setting:
        {
            screen: ProfileSetting2,
            navigationOptions: {
                header: null,
            }
        },

    Menu:
        {
            screen: MenuScreen,
            navigationOptions:
                {
                    header : null,
                }
        },
    toyScreen: {
        screen: ToysFeedScreen,
        navigationOptions:
            {
                header : null,
            }
    },
    detailsToyScreen: {
        screen: DetailsToyScreen,
        navigationOptions: {
            header: null,
        }
    },
    ParentMenu:
        {
            screen: ParentCheckScreen,
            navigationOptions:
                {
                    header: null,
                }
        },
    Password:
        {
            screen: PasswordScreen,
            navigationOptions:
                {
                    header: null,
                }
        },
    History:
        {
            screen: HistoryDetail,
            navigationOptions:
                {
                    header: null,
                }
        },
    ChatDetail: {
        screen: ChatScreen,
        navigationOptions: {
            header: null
        }
    },
    ChatList: {
        screen: ChatListScreen,
        navigationOptions: {
            header: null
        }
    },
    CartoonScreen:{
        screen:CartoonScreen,
        navigationOptions:{
            header:null
        }
    },
    VideoScreen:{
        screen:VideoScreen,
        navigationOptions:{
            header:null
        }
    },
    TvShowScreen:{
        screen:TvShowScreen,
        navigationOptions:{
            header:null
        }
    }

});


const prevGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
    // Do not allow to go back from Home


    // Do not allow to go back to Login
    if (action.type === 'Navigation/BACK' && state) {
        const newRoutes = state.routes.filter(r => ((r.routeName !== 'Login' && r.routeName !== 'Splash') || globalStore.initScreen == true));
        const newIndex = newRoutes.length - 1;
        return prevGetStateForAction(action, {index: newIndex, routes: newRoutes});
    }
    ;

    return prevGetStateForAction(action, state);
};
