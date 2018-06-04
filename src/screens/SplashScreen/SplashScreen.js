import React, {Component} from 'react'
import {PRIMARY_BUTTON_THREE} from "../../components/PrimaryButton";
import {PRIMARY_COLOR} from "../../config/const";
import {loginInfo, Realm, listModel, stackNavigate, profile} from '../../store/realm'
import {Image, View} from "react-native";
import globalStore from "../../store/global";

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isHaveToken: false
            }

    }

    componentWillMount() {
        const realm = new Realm(loginInfo);
        if (realm.objects(loginInfo.schema[0].name).length === 1) {
            this.setState({isHaveToken: true});
            var info = {... realm.objects(loginInfo.schema[0].name)['0']};
            globalStore.updateData('loginInfo', info);
            realm.close();
            //
            //         //this.LoadProfile();
            //
        }
        else {
            this.setState({isHaveToken: false});
            listModel.map(Model => {
                console.log('Model------------')
                console.log(Model.schema[0]);
                var realm = new Realm(Model);
                realm.deleteModel(Model.schema[0].name);
                realm.close();
            });
            realm.close();
        }
        //
        //
        setTimeout(() => {
                if (this.state.isHaveToken === true) {
                    //                const realm = new Realm(stackNavigate);
                    //                 var stack = realm.objects(stackNavigate.schema[0].name).slice();
                    //                  if (stack.length > 0) {
                    //                     if (stack['0'].screens !== undefined) {
                    //                         let res = JSON.parse(stack['0'].screens);
                    //                         let prop = JSON.parse(stack['0'].props);
                    //                         console.log('------------------');
                    //                         console.log(res);
                    //                         console.log(prop);
                    //                         let navigates = [];
                    //                         for (var i = 0; i < res.length; i++) {
                    //                             navigates.push({screen : res[i],props : prop[i]});
                    //                         };
                    //                         navigates.map(navigate=>{
                    //                             setTimeout(() => {
                    //                                 if (navigates[navigates.length - 1].screen === navigate.screen) {
                    //                                     globalStore.initScreen = false;
                    //                                     this.props.navigation.navigate(navigate.screen, navigate.props);
                    //                                 }
                    //                                 else {
                    //                                     this.props.navigation.navigate(navigate.screen,navigate.props);
                    //                                 }
                    //                             },500);
                    //                         });
                    //
                    //                         realm.write(() => {
                    //                             realm.delete(realm.objects(stackNavigate.schema[0].name))
                    //                         });
                    //                     }
                    //                     else {
                    //                         globalStore.initScreen = false;
                    //                         this.props.navigation.navigate('Profile');
                    //                     }
                    //                 }
                    //                 else {
                    //                     globalStore.initScreen = false;
                    this.props.navigation.navigate('Profile');

                }
                else {
                    this.props.navigation.navigate('Login')
                }
            },
            2000
        );
        realm.close();
    }


    // LoadProfile() {
    //     //From local
    //     const realm = new Realm(profile)
    //     if (realm.objects(profile.schema[0].name).length === 1) {
    //         this.setState(previousState => {
    //             return {
    //                 info:
    //                     {
    //                         ...previousState.info,
    //                         ...realm.objects(profile.schema[0].name)['0'],
    //                     }
    //             }
    //         });
    //         globalStore.updateData('Profile', {info: {...JSON.parse(realm.objects(profile.schema[0].name)['0'].profile)}});
    //         realm.close();
    //     }
    //     else {
    //
    //         //From Server if not call by local navigate
    //         fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/my-profile',
    //             {
    //                 method: 'GET',
    //                 headers:
    //                     {
    //                         'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
    //                     }
    //             }).then((response) =>
    //             (response.status >= 200 && response.status <= 299) ? response.json() : 'Error')
    //             .then((responseJson) => {
    //                     if (responseJson === 'Error')
    //                         alert('Lỗi không xác định')
    //                     else {
    //                         const realm = new Realm(profile);
    //                         realm.write(() => {
    //                             realm.delete(realm.objects(profile.schema[0].name))
    //                         });
    //                         realm.write(() => {
    //                             let res = JSON.stringify(responseJson);
    //                             realm.create(profile.schema[0].name, {profile: res}, true);
    //                         });
    //                         realm.close();
    //                         this.setState({
    //                                 info: responseJson
    //                             }
    //                         );
    //                     }
    //
    //
    //                 }
    //             ).catch((error) => {
    //             console.error(error);
    //         });
    //     }
    // }


    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 1500);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image
                    style={{flex: 1}}
                    source={{uri: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.15752-9/33519305_668594816817530_2722521499113095168_n.png?_nc_cat=0&oh=cdb196454461c138d52c508a179adb51&oe=5B76D82F'}}
                />
            </View>
        );
    }
}