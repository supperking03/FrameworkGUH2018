import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ScrollView} from "react-native";
import {
    BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "../../../../config/const";
import {Icon} from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SingleLineTextInput from "../../../../components/SingleLineTextInput/SingleLineTextInput";
import BorderTextInput from "../../../../components/BorderTextInput/BorderTextInput";
import RadioButtonGroup from "../../../../components/RadioButtonGroup/RadioButtonGroup";
import globalStore from "../../../../store/global";
import {tabNavigatorHeight} from "../../HomeTabNavigation";
import {profile} from "../../../../store/realm";

export default class ProfileSettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                avatarImageUrl: this.props.navigation.state.params.info.avatarImageUrl,
                fullName: this.props.navigation.state.params.info.fullName,
                nickName: this.props.navigation.state.params.info.nickName,
            };
        console.log('Constructer setting------------------------------------');
    }

    onSave = () => {
        this.UploadUserInfo(this.state.fullName, this.state.nickName);
        this.props.navigation.goBack();
    };


    UploadUserInfo(full, nick) {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/my-profile?props=fullName,nickName',
            {
                method: 'PUT',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': "application/json",
                    },
                body:
                    JSON.stringify({
                        "fullName": this.state.fullName,
                        "nickName": this.state.nickName,
                    }),
            }).then((response) => {
            // console.log(response);
            (response.status >= 200 && response.status <= 299) ? response.json() : 'Error'
        })
            .then((responseJson) => {
                if (responseJson === 'Error')
                    alert('Lỗi không xác định')
                else {
                    let local =
                        {
                            ...globalStore.getStateOf('Profile').info,
                            fullName: this.state.fullName,
                            nickName: this.state.nickName,
                        };
                    globalStore.setStateOf('Profile', {
                        info: local,
                        visible: false,
                    });

                    const realm = new Realm({path : 'profileRealm.realm', schema : [profile]});
                    realm.write(()=>{
                        realm.delete(realm.objects(profile.name));
                        realm.create(profile.name,local,true);
                    })
                    realm.close();


                }
            }).catch((error) => {
            console.error(error);

        })

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.headerBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                                globalStore.setStateOf('Profile', {visible: false})
                            }}>
                            <Text style={styles.headerText2}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Edit Profile</Text>
                        <TouchableOpacity
                            onPress={this.onSave}>
                            <Text style={styles.headerText2}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.button}
                                source={{uri: this.state.avatarImageUrl}}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.textInputContainer}>
                                <View style={styles.textInputLabel}>
                                    <Text style={styles.subText}>Full Name</Text>
                                </View>
                                <SingleLineTextInput
                                    style={styles.textInput}
                                    value={this.state.fullName}
                                    onChangeText={(value) => this.setState({fullName: value})}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <View style={styles.textInputLabel}>
                                    <Text style={styles.subText}>Nick Name</Text>
                                </View>
                                <SingleLineTextInput
                                    style={styles.textInput}
                                    value={this.state.nickName}
                                    onChangeText={(value) => this.setState({nickName: value})}/>
                            </View>
                            {/*{*/}
                            {/*<View style={styles.textInputContainer2}>*/}
                            {/*<View style={{width: '100%', height: '50%', justifyContent: 'center'}}>*/}
                            {/*<Text style={styles.subText}>Bio</Text>*/}
                            {/*</View>*/}
                            {/*<SingleLineTextInput style={[styles.textInput, {width: '100%', height: '50%'}]}*/}
                            {/*placeholder={'Bio bref....'}/>*/}
                            {/*</View>*/}

                            {/*<View style={[styles.textInputContainer, {marginTop: '5%'}]}>*/}
                            {/*<View style={styles.textInputLabel}>*/}
                            {/*<Text style={styles.subText}>Birthday</Text>*/}
                            {/*</View>*/}
                            {/*<SingleLineTextInput style={styles.textInput}/>*/}
                            {/*</View>*/}
                            {/*<View style={styles.textInputContainer}>*/}
                            {/*<View style={styles.textInputLabel}>*/}
                            {/*<Text style={styles.subText}>Gender</Text>*/}
                            {/*</View>*/}
                            {/*<RadioButtonGroup*/}
                            {/*style={[styles.textInput, {height: '70%', alignSelf: 'center'}]}*/}
                            {/*options={['Male', 'Female']}/>*/}
                            {/*</View>*/}
                            {/*}*/}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: (Dimensions.get('window').height * 0.96) - 50,
                backgroundColor: SURFACE_COLOR
            },
        headerBar:
            {
                width: '100%',
                height: '8%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '5%',
                paddingRight: '5%',
                backgroundColor: 'white'
            },
        headerText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: SUBTEXT_FONT_SIZE,
                color: 'black'
            },
        headerText2:
            {
                fontFamily: TEXT_FONT_REGULAR,
                fontSize: SUBTEXT_FONT_SIZE,
                color: PRIMARY_COLOR
            },
        body:
            {
                width: '100%',
                height: '92%',
                alignItems: 'center',
            },

        infoContainer:
            {
                width: '100%',
                height: '70%',
                flexDirection: 'column',
                alignItems: 'center',
            },
        imageContainer:
            {
                width: '100%',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
            },
        button:
            {
                width: '20%',
                aspectRatio: 1,
                borderRadius: 100,
                backgroundColor: SURFACE_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
            },
        subText:
            {
                fontFamily: TEXT_FONT_REGULAR,
                fontSize: PARAGRAPH_FONT_SIZE,
                color: ON_SURFACE_COLOR,
            },
        textInputContainer:
            {
                width: '100%',
                height: '10%',
                flexDirection: 'row',
                backgroundColor: 'white',
                borderColor: ON_SURFACE_COLOR,
                borderWidth: 0.5,
                paddingLeft: '5%',
            },
        textInputContainer2:
            {
                width: '100%',
                height: '20%',
                backgroundColor: 'white',
                borderColor: ON_SURFACE_COLOR,
                borderWidth: 0.5,
                marginTop: '5%',
                paddingLeft: '5%',
            },
        textInputLabel:
            {
                width: '30%',
                height: '100%',
                justifyContent: 'center',
            },
        textInput:
            {
                width: '70%',
                height: '120%',
                justifyContent: 'center',
                borderColor: 'transparent',
            }
    }
);