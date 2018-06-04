import React, {Component} from 'react'
import {Image, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from "react-native";
import {Icon} from "react-native-elements";
import {
    H1_FONT_SIZE, H3_FONT_SIZE, ON_PRIMARY_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR,
    SUBHEADING_FONT_SIZE,
    SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "../../../../config/const";
import {Text} from "react-native-elements";
import SlidingUpPanel from "rn-sliding-up-panel";
import ProfileScreenSlidingUpContent from "../../../../components/SlidingUpContent/ProfileScreenSlidingUpContent";
import globalStore from "../../../../store/global";
import {tabNavigatorHeight} from "../../HomeTabNavigation";
import {PRIMARY_BUTTON_THREE} from "../../../../components/PrimaryButton";
import {FBLoginManager} from 'react-native-facebook-login'
import {Realm, profile, photo} from "../../../../store/realm";
import Spinner from "react-native-loading-spinner-overlay";
import realtime from "../../../../store/realtime";
import ImageResizer from "react-native-image-resizer/index.android";
import {NavigationActions} from 'react-navigation';

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoading: false,
            _this: this,
            info:
                {
                    fullName: '',
                    nickName: '',
                    avatarImageUrl: 'a',
                    following: '0',
                    followers: '0',
                    photos: [
                        {
                            id: '1',
                            imageUrl: 'a',
                        }
                    ]
                }

        }

        globalStore.register('Profile', (s) => this.setState(s),
            () => {
                return this.state
            });
        //this.LoadProfile();
    }

    LoadProfile() {
        //From local
        const realm = new Realm(profile)
        if (realm.objects(profile.schema[0].name).length === 1) {
            this.setState(previousState => {
                return {
                    info:
                        {
                            ...previousState.info,
                            ...realm.objects(profile.schema[0].name)['0'],
                        }
                }
            });
            globalStore.updateData('Profile', {info: {...JSON.parse(realm.objects(profile.schema[0].name)['0'].profile)}});
        }
        else {
            this.setState({isLoading: true})
        }
        realm.close();

        if (globalStore.initScreen === false || this.state.isLoading === true) {
            //From Server if not call by local navigate
            fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/my-profile',
                {
                    method: 'GET',
                    headers:
                        {
                            'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        }
                }).then((response) =>
                (response.status >= 200 && response.status <= 299) ? response.json() : 'Error')
                .then((responseJson) => {
                        if (responseJson === 'Error')
                            alert('Lỗi không xác định')
                        else {
                            const realm = new Realm(profile);
                            realm.write(() => {
                                realm.delete(realm.objects(profile.schema[0].name))
                            });
                            realm.write(() => {
                                let res = JSON.stringify(responseJson);
                                realm.create(profile.schema[0].name, {profile: res}, true);
                            });
                            realm.close();
                            this.setState({
                                    info: responseJson
                                }
                            );
                        }

                        this.setState({isLoading: false});

                        console.log('Fetch API profile ---------------------------------------');
                    }
                ).catch((error) => {
                console.error(error);
                this.setState({isLoading: false});
            });
        }
    }

    pickImagePressed = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const data = new FormData();
                ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 80)
                    .then(({uri}) => {
                        data.append('file', {
                            uri: uri,
                            type: 'image/jpeg',
                            name: response.fileName
                        });
                        this.UploadAvatar(data);
                    }).catch((err) => {
                    console.log(err);
                    return alert('Unable to resize the photo',
                        'Check the console for full the error message');
                });
            }
            this.setState({visible: false});
        });
    }

    UploadUserInfo(image) {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/my-profile?props=avatarImageUrl',
            {
                method: 'PUT',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': "application/json",
                    },
                body:
                    JSON.stringify({
                        "avatarImageUrl": image
                    }),
            }).then((response) => {
            (response.status >= 200 && response.status <= 299) ? response.json() : 'Error'
        })
            .then((responseJson) => {
                if (responseJson === 'Error')
                    alert('Lỗi không xác định')
                else {
                    this.setState(previousState => {
                        return {
                            info: {
                                ...previousState.info,
                                avatarImageUrl: image,
                            }
                        }
                    })
                }
            }).catch((error) => {
            console.error(error);

        })

    }

    UploadAvatar(data) {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/upload-file',
            {
                method: 'POST',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                    },
                body: data,
            }).then((response) =>
            (response.status >= 200 && response.status <= 299) ? response.json() : 'Error')
            .then((responseJson) => {
                if (responseJson === 'Error')
                    alert('Lỗi không xác định')
                else {
                    let url = (responseJson.url.startsWith('/') === true) ? ('http://150.95.110.222:23300' + responseJson.url) : responseJson;

                    this.UploadUserInfo(url);
                }
            }).catch((error) => {
            console.error(error);

        })

    }

    componentDidMount() {
        // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJndWgyMDE4LnBtY2wiLCJ0eXBlIjoiQUNDRVNTIiwiZXhwIjoxNTI3MzM1NjIyLCJpYXQiOjE1MjY3MzA4MjIsInVzZXJJZCI6Mn0.CDvAu6cfcOYmda_XFUJmoYtJS_eP3Q902_co49lH62k";
        // realtime.connect(2, accessToken);
        //
        // realtime.on("NOTIFICATION", this, (data) => {
        //   console.log("Notification");
        //   console.log(data);
        // })
    }

    componentWillUnmount() {
        realtime.remove(this);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.topContainer}>
                            <Image
                                style={{flex: 1}}
                                source={{uri: 'https://media.discordapp.net/attachments/378600864077840391/445256478694309898/Anh_man_hinh_180429_005.jpg?width=887&height=499'}}/>
                            {/*<View style={styles.headerBar}>*/}
                            {/*<TouchableOpacity>*/}
                            {/*<Icon name='arrow-back' color='white'/>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity>*/}
                            {/*F<Icon name='cloud-upload' color='white'/>*/}
                            {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        </View>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={styles.avatar}
                                source={{uri: (this.state.info.avatarImageUrl === null) ? 'https://i.quantrimang.com/photos/image/072015/22/avatar.jpg' : this.state.info.avatarImageUrl}}
                            />
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.nameText}>{this.state.info.fullName}</Text>
                            <Text
                                style={styles.subText}>{(this.state.info.nickName === null) ? '@Nick name' : this.state.info.nickName}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}>
                                <Icon name='textsms' size={25} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.subText, {color: PRIMARY_COLOR}]}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({visible: true});
                                }}
                                style={styles.button}>
                                <Icon name='more-horiz' size={25} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.subText, {color: PRIMARY_COLOR}]}>More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%'}}>
                            <View style={styles.detailRow}>
                                <Icon name='people' size={23} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.detailText, {
                                    fontFamily: TEXT_FONT_BOLD,
                                    marginLeft: '5%'
                                }]}>{this.state.info.following}</Text>
                                <Text style={styles.detailText}> Following</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name='check-box' size={23} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.detailText, {
                                    fontFamily: TEXT_FONT_BOLD,
                                    marginLeft: '5%'
                                }]}>{this.state.info.followers} </Text>
                                <Text style={styles.detailText}>Followers</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name='insert-photo' size={23} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.detailText, {
                                    fontFamily: TEXT_FONT_BOLD,
                                    marginLeft: '5%'
                                }]}>{this.state.info.photos.length}</Text>
                                <Text style={styles.detailText}> Photos</Text>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: 'auto',
                                        paddingRight: 10,
                                    }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Gallery');
                                    }}>
                                    <Text style={{
                                        fontFamily: TEXT_FONT_REGULAR,
                                        fontSize: SUBTEXT_FONT_SIZE,
                                        color: PRIMARY_BUTTON_THREE.color
                                    }}>More...</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            (this.state.info.photos.length > 0) ?
                                <ScrollView style={{marginTop: 20}}>
                                    <View style={styles.galleyContainer}>
                                        {
                                            this.state.info.photos.map((photo, idx) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.galleyImage}
                                                        onPress={() => {
                                                            this.props.navigation.navigate('PhotoView', {
                                                                photos: this.state.info.photos,
                                                                position: idx,
                                                            })
                                                        }
                                                        }>
                                                        <Image
                                                            key={idx}
                                                            source={{uri: photo.imageUrl}}
                                                            style={{flex: 1}}>
                                                        </Image>
                                                    </TouchableOpacity>
                                                );
                                            })
                                        }
                                    </View>
                                </ScrollView> : <View/>
                        }
                    </View>
                </ScrollView>
                <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                <SlidingUpPanel
                    visible={this.state.visible}
                    allowDragging={false}
                    onRequestClose={() => {
                        this.setState({visible: false})
                    }}
                    ref={panel => this._panel = panel}
                    height={Dimensions.get('window').height * 0.3}
                    draggableRange={{
                        top: Dimensions.get('window').height * 0.3 + tabNavigatorHeight,
                        bottom: tabNavigatorHeight
                    }}>

                    <ProfileScreenSlidingUpContent
                        onUploadAvatarPress={() => {
                            this.pickImagePressed();
                        }}
                        onSettingPress={() => {
                            this.props.navigation.navigate('Setting', {info: this.state.info});
                        }}
                        onLogoutPress={() => {
                            FBLoginManager.logout(() => {
                                this.setState({visible: false});
                                this.props.navigation.reset({
                                    index: 1,
                                    key: null,
                                    actions: [this.props.navigation.navigate({routeName: 'Login'})]
                                });
                                Realm.deleteFile(() => {
                                    console.log('deleteAll');
                                });
                            })
                        }}
                        onCancelPress={() => {
                            this.setState({visible: false});
                        }}/>
                </SlidingUpPanel>
            </View>

        );
    }

}

const
    styles = StyleSheet.create(
        {
            container: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: ON_PRIMARY_COLOR,
                alignItems: 'center',
            },

            topContainer:
                {
                    width: '100%',
                    height: '30%',
                    justifyContent: 'flex-start',
                },
            headerBar:
                {
                    width: '100%',
                    height: '40%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'absolute',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                },
            avatarContainer:
                {
                    width: 100,
                    aspectRatio: 1,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: -50,
                },
            avatar:
                {
                    width: '96%',
                    aspectRatio: 1,
                    borderRadius: 50,
                },
            nameText:
                {
                    fontFamily: TEXT_FONT_BOLD,
                    fontSize: H1_FONT_SIZE,
                    color: 'black',
                },
            subText:
                {
                    fontFamily: TEXT_FONT_REGULAR,
                    fontSize: SUBTEXT_FONT_SIZE,
                    color: ON_SURFACE_COLOR,
                },
            detailText:
                {
                    fontFamily: TEXT_FONT_REGULAR,
                    fontSize: SUBHEADING_FONT_SIZE,
                    color: 'black',
                },
            buttonContainer:
                {
                    flexDirection: 'row',
                    width: '95%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1%',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: ON_SURFACE_COLOR,
                },
            button:
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            detailRow:
                {
                    width: '100%',
                    height: 40,
                    padding: '3%',
                    flexDirection: 'row',
                    marginLeft: '3%',
                    marginRight: '3%',
                },
            galleyContainer:
                {
                    width: '100%',
                    aspectRatio: 3,
                    flexDirection: 'row',
                    paddingHorizontal: '5%',
                },
            galleyImage:
                {
                    width: '30%',
                    aspectRatio: 1,
                    marginRight: '3%',
                }

        }
    );
