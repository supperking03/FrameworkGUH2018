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
import ImageResizer from "react-native-image-resizer/index.android";
import globalStore from "../../../../store/global";
import {tabNavigatorHeight} from "../../HomeTabNavigation";

export default class OtherProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChatRoomId: '',
            info:
                {
                    fullName: '',
                    nickName: '',
                    avatarImageUrl: 'a',
                    followed: false,
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

        globalStore.register('OtherProfile', (s) => this.setState(s),
            () => {
                return this.state
            });

        this.LoadProfile();
    }

    onFollowPress() {
        if (this.state.info.followed === true)
            this.unFollowUser();
        else
            this.followUser();
    }

    followUser() {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/follow?to-user-id=' + this.props.navigation.state.params.userId,
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
                    this.setState(previousState => {
                        return {
                            info: {
                                ...previousState.info,
                                followed: true,
                                followers: previousState.info.followers + 1,
                            }
                        }
                        this.LoadProfile();
                    });
                }
            }).catch((error) => {
            console.error(error);

        })

    }

    unFollowUser() {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/unfollow?to-user-id=' + this.props.navigation.state.params.userId,
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
                    this.setState(previousState => {
                        return {
                            info: {
                                ...previousState.info,
                                followed: false,
                                followers: previousState.info.followers - 1,
                            }
                        }

                        this.LoadProfile();

                    });
                }
            }).catch((error) => {
            console.error(error);

        })

    }

    LoadProfile() {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/other-users/' + this.props.navigation.state.params.userId + '/profile',
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
                    this.setState({
                        info: responseJson
                    });
                }
            }).catch((error) => {
            console.error(error);
        })
    }

    createChat(){
        var error = '';
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/other-users/' + this.props.navigation.state.params.userId +'/chat',
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                    }
            }).then((response) => {
                var res ='';
                if (response.status >= 200 && response.status <= 299)
                    res = response.json();
                else {
                    errorCode = response;
                    console.log(`Error:   ${response.json()}`);
                    return 'Error';
                }
                return res;
            }
        )
            .then((res) => {
                if (res === 'Error') {
                    console.log(`Lỗi ${error.status}`);
                    console.log(error);
                }
                else {
                    console.log('aaaaa');
                    console.log(res);
                    this.setState({
                        currentChatRoomId:res.chatId,
                    });
                    this.props.navigation.navigate("ChatDetail",{ChatId : res.chatId});
                }
            }).catch((error) => {
            console.error(error);

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.topContainer}>
                            <Image
                                style={{flex: 1}}
                                source={{uri: 'https://media.discordapp.net/attachments/378600864077840391/445256478694309898/Anh_man_hinh_180429_005.jpg?width=887&height=499'}}/>
                            <View style={styles.headerBar}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}>
                                    <Icon name='arrow-back' color='white'/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View/>
                                </TouchableOpacity>
                            </View>
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
                                style={styles.button}
                                onPress={this.onFollowPress.bind(this)}>
                                <Icon name='store' size={25}
                                      color={(this.state.info.followed === true) ? PRIMARY_COLOR : ON_SURFACE_COLOR}/>
                                <Text
                                    style={[styles.subText, {color: PRIMARY_COLOR}]}>{(this.state.info.followed === true) ? 'Following' : 'Follow'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.createChat();
                                }}
                                style={styles.button}>
                                <Icon name='textsms' size={25} color={ON_SURFACE_COLOR}/>
                                <Text style={[styles.subText, {color: PRIMARY_COLOR}]}>Message</Text>
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
                            </View>
                        </View>
                        {
                            (this.state.info.photos.length > 0) ?
                                <ScrollView style={{marginTop: 20}}>
                                    <View style={styles.galleyContainer}>
                                        {
                                            this.state.info.photos.map(photo => {
                                                return (
                                                    <Image
                                                        key={photo.imageUrl}
                                                        source={{uri: photo.imageUrl}}
                                                        style={styles.galleyImage}>
                                                    </Image>
                                                );
                                            })
                                        }
                                    </View>
                                </ScrollView> : <View/>
                        }
                    </View>
                </ScrollView>
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
                            this.props.navigation.navigate('Setting');
                        }}
                        onLogoutPress={() => {
                            alert('Log Out')

                        }}
                        onCancelPress={() => {
                            this.setState({visible: false});
                        }}/>
                </SlidingUpPanel>
            </View>

        );
    }

}

const styles = StyleSheet.create(
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
