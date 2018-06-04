import React, {Component} from 'react'
import {FBLogin, FBLoginManager} from 'react-native-facebook-login'
import {Image, View, StyleSheet, Text, ImageBackground} from "react-native";
import {
    H1_FONT_SIZE,
    H3_FONT_SIZE,
    ON_PRIMARY_COLOR,
    ON_SURFACE_COLOR,
    PARAGRAPH_FONT_SIZE,
    PRIMARY_COLOR, SUBHEADING_FONT_SIZE,
    SUBTEXT_FONT_SIZE,
    TEXT_FONT_BOLD,
    TEXT_FONT_MEDIUM,
    TEXT_FONT_REGULAR
} from "../../config/const";
import {FacebookLoginButton, PRIMARY_BUTTON_THREE} from "../../components/PrimaryButton/index";
import globalStore from "../../store/global";
import {Realm, loginInfo} from "../../store/realm"

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            accessToken: '',
        };
        globalStore.register('Login', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    login(token) {
        fetch('http://150.95.110.222:23300/api/v2/login-with-facebook?access-token=' + token)
            .then((response) => {
                    console.log(response.status);
                    if (response.status >= 200 && response.status <= 299) {
                        return {
                            status: 'succeeded',
                            data: response.json()
                        }
                    }
                    if (response.status >= 400 && response.status <= 499) {
                        return {
                            status: 'checked-error',
                            data: response.json()
                        }
                    }
                    return {
                        status: 'unknown-error',
                        data: response.text()
                    }
                }
            )
            .then((res) => {
                    if (res.status === 'succeeded') {
                        globalStore.initScreen = false;

                        res.data.then(data => {
                            globalStore.updateData('loginInfo', data);

                            const realm = new Realm(loginInfo)
                            realm.write(() => {
                                realm.delete(realm.objects(loginInfo.schema[0].name))
                            })
                            realm.write(() => {
                                realm.create(loginInfo.schema[0].name, data, true);
                            });
                            realm.close();
                            setTimeout(()=>
                            {
                                this.props.navigation.navigate('Profile');
                            },200);
                        })
                    }
                    else if (res.status === 'checked-user') {
                        res.data.then(s => {
                            console.log(s)
                        });
                    }
                    else {
                        res.data.then(s => {
                            console.log(s)
                        });
                    }
                }
            ).catch((error) => {
            console.error(error);

        });

    }

    render() {
        const _this = this;
        return (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.container}>
                <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={{uri: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.15752-9/33601913_668595006817511_2919723372025741312_n.png?_nc_cat=0&oh=168f4523bcdfe2eaed5a38d4aea4d82f&oe=5B906B33'}}
                        style={{width: '70%', aspectRatio: 2, resizeMode: 'stretch'}}/>
                </View>
                <View style={{width: '100%', height: '10%', justifyContent: 'center'}}>
                    <FBLogin
                        buttonView={<FacebookLoginButton/>}
                        permissions={["email"]}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        onLogin={function (data) {
                            //console.log(data.credentials.token);
                            _this.login(data.credentials.token);
                        }}
                        onLogout={function () {
                            console.log("Logged out.");
                        }}
                        onLoginFound={function (data) {
                            //console.log(data.credentials.token);
                            _this.login(data.credentials.token);
                        }}
                        onLoginNotFound={function () {
                            console.log("No user logged in.");
                        }}
                        onError={function (data) {
                            console.log("ERROR");
                            console.log(data);
                        }}
                        onCancel={function () {
                            console.log("User cancelled.");
                        }}
                        onPermissionsMissing={function (data) {
                            console.log("Check permissions!");
                            console.log(data);
                        }}
                    />
                </View>
                <View style={{width: '100%', height: '5%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        <Text style={{fontFamily: TEXT_FONT_BOLD, fontSize: SUBHEADING_FONT_SIZE, color: 'black'}}>Term
                            of service</Text>
                        <Text style={{
                            fontFamily: TEXT_FONT_REGULAR,
                            fontSize: SUBHEADING_FONT_SIZE,
                            color: 'black'
                        }}> and </Text>
                        <Text style={{fontFamily: TEXT_FONT_BOLD, fontSize: SUBHEADING_FONT_SIZE, color: 'black'}}>Privacy
                            Policy</Text>
                    </Text>
                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingBottom: 20,
            },
        subText:
            {
                fontFamily: TEXT_FONT_MEDIUM,
                fontSize: SUBTEXT_FONT_SIZE,
            },
        nameText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H1_FONT_SIZE,
                color: PRIMARY_BUTTON_THREE.color,
            }

    }
);