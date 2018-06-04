import React, {Component} from 'react'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import PTRView from 'react-native-pull-to-refresh';
import {
    Dimensions, Image, ListView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View, Alert, ImageBackground
} from "react-native";
import {
    BACKGROUND_COLOR, H1_FONT_SIZE, H3_FONT_SIZE, ON_BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE,
    PRIMARY_COLOR,
    SUBHEADING_FONT_SIZE,
    SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_BOLD, TEXT_FONT_HEAVY, TEXT_FONT_LIGHT, TEXT_FONT_MEDIUM, TEXT_FONT_REGULAR
} from "../../../../config/const";
import {Icon} from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import globalStore from "../../../../store/global";
import TimerCountdown from "react-native-timer-countdown";


export default class ChatListScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                chatList: [],
                _this: this,
                currentChatRoomId: '',
            }


        globalStore.register('ChatList', (s) => this.setState(s),
            () => {
                return this.state
            });
    }


    componentWillMount() {

        this.LoadList();
    }


    LoadList() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/challenge-rooms',
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': 'application/json'
                    },
            }).then((response) => {
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
                    console.log('Chat list Screen bbbb');
                    res.data.then(data => {
                        console.log(data);
                        this.setState({
                            chatList: data.rooms,
                        })
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
            }).catch((error) => {
            console.error(error);

        });
    }

    createChat(guestId) {
        var error = '';
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/other-users/' + guestId + '/chat',
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                    }
            }).then((response) => {
                var res = '';
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
                        currentChatRoomId: res.chatId,
                    });
                    this.props.navigation.navigate("ChatDetail", {ChatId: res.chatId});
                }
            }).catch((error) => {
            console.error(error);

        })
    }

    joinRoom(data) {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/rooms/' + data.id + '/join',
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': 'application/json'
                    },
            }).then((response) => {
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
                    console.log('Chat list Screen bbbb');
                    console.log("DATAAAAAAAAAAAAAAAAAAAAAAA");
                    console.log(data);
                    this.props.navigation.navigate("ChatDetail", {ChatId: data.id});
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
            }).catch((error) => {
            console.error(error);

        });
    }

    refreshList() {
        this.LoadList();
    }

    render() {
        const iconSize = Dimensions.get('window').height * 0.96 * 0.2;
        return (
            <KeyboardAwareScrollView style={{width: '100%', height: '100%'}}>
                <View
                    style={styles.container}>
                    <View style={styles.header}>
                        <ImageBackground
                            style={{width: "100%", height: "100%"}}
                            source={require('../../../../assets/images/header-thitho.png')}/>
                    </View>

                    <View
                        style={styles.invitedView}>
                        <TouchableOpacity
                            style={styles.invitedButton}>
                            <Image
                                style={{width: "100%", height: "100%", borderRadius: 10}}
                                source={require('../../../../assets/images/button-dathamgia.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <PTRView
                            onRefresh={() => {
                                this.refreshList();
                            }}>
                            <ScrollView style={styles.chatScrollView}>

                                {
                                    this.state.chatList.map(data => {
                                        return (
                                            <TouchableOpacity style={styles.chatItem}
                                                              onPress={() => {
                                                                  Alert.alert(
                                                                      'Nhắc nhở!',
                                                                      'Bạn có muốn tham gia cuộc thi không ?',
                                                                      [
                                                                          {
                                                                              text: 'Không',
                                                                              onPress: () => console.log('Cancel Pressed'),
                                                                              style: 'cancel'
                                                                          },
                                                                          {
                                                                              text: 'Tham gia', onPress: () => {
                                                                              this.joinRoom(data);
                                                                          }
                                                                          },
                                                                      ],
                                                                      {cancelable: false}
                                                                  )
                                                              }}>
                                                <ImageBackground
                                                    style={{
                                                        width: '100%',
                                                        height: 105,
                                                    }}
                                                    source={require('../../../../assets/images/panel.png')}>

                                                    <Text style={styles.nameText}>{data.name}</Text>


                                                    {
                                                        data.type === "MATH" ?
                                                            (<Image
                                                                style={styles.chatAvatar}
                                                                source={require('../../../../assets/images/calculator.png')}/>)
                                                            :
                                                            data.type === "ENGLISH" ?
                                                                (<Image
                                                                    style={styles.chatAvatar}
                                                                    source={require('../../../../assets/images/abc.png')}/>)
                                                                :
                                                                (<Image
                                                                    style={styles.chatAvatar}
                                                                    source={require('../../../../assets/images/animals.png')}/>)

                                                    }


                                                    <TimerCountdown
                                                        initialSecondsRemaining={data.startTime - (new Date()).getTime()}
                                                        onTick={() => {
                                                        }}
                                                        onTimeElapsed={() => {
                                                        }}
                                                        allowFontScaling={true}
                                                        style={{fontSize: 20, marginLeft: 110, marginTop: 50}}
                                                    />
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </ScrollView>
                        </PTRView>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: Dimensions.get('window').height * 0.96,
                alignItems: 'center',
            },
        header:
            {
                width: '100%',
                height: 50,
                backgroundColor: "white",
                paddingTop: 4,
            },
        invitedView:
            {
                width: '100%',
                height: 90,
                paddingHorizontal: '6%',
                paddingVertical: '4%',
            },
        invitedButton:
            {
                borderRadius: 15,
                height: 60,
            },
        headerContent2:
            {
                width: '100%',
                height: '67%',
                paddingHorizontal: '5%'
            },
        headerText:
            {
                fontSize: H1_FONT_SIZE ,
                fontFamily: TEXT_FONT_BOLD,
                color: 'black',
            },
        headerAvatar:
            {
                height: '60%',
                aspectRatio: 1,
                borderRadius: 100,
            },
        searchView:
            {
                width: '100%',
                height: '40%',
                backgroundColor: SURFACE_COLOR,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 100,
                paddingHorizontal: '3%',

            },
        textInput:
            {
                width: '100%',
                height: '120%',
            },
        chatScrollView: {
            backgroundColor:BACKGROUND_COLOR,
            width: '100%',
            flex: 1,
        },
        chatItem:
            {
                borderRadius: 20,
                width: '100%',
                height: 110,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: BACKGROUND_COLOR,
            },
        chatListView: {
            flex: 1,
        },
        chatAvatar:
            {
                resizeMode: "center",
                width: 70,
                height: 70,
                marginLeft: 17,
                marginTop: 16,
            },
        chatContent:
            {
                elevation: 8,
                marginLeft: 80,
                width: '80%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 16,
               // marginLeft: 'auto',
                backgroundColor:BACKGROUND_COLOR,
                borderRadius:10,
            },
        chatText:
            {
                flex: 4,
            },
        nameText:
            {
                position: 'absolute',
                fontSize: PARAGRAPH_FONT_SIZE,
                fontFamily: TEXT_FONT_BOLD,
                color: ON_BACKGROUND_COLOR,
                marginLeft: 105,
                marginTop: 25,
            },
        countDownText:
            {
                position: 'absolute',
                fontSize: PARAGRAPH_FONT_SIZE,
                fontFamily: TEXT_FONT_LIGHT,
                color: ON_BACKGROUND_COLOR,
                marginLeft: 105,
                marginTop: 53,
            },
        messageText:
            {
                fontSize: SUBHEADING_FONT_SIZE,
                fontFamily: TEXT_FONT_REGULAR,
                color: ON_SURFACE_COLOR,
            },
        chatEtc:
            {
                flex: 1,
                alignItems: 'flex-end'
            },
        timeText:
            {
                fontSize: SUBTEXT_FONT_SIZE,
                fontFamily: TEXT_FONT_REGULAR,
                color: ON_SURFACE_COLOR,
            },
        newMessage:
            {
                height: SUBTEXT_FONT_SIZE + 2,
                borderRadius: (SUBTEXT_FONT_SIZE + 2) / 2,
                backgroundColor: PRIMARY_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
            },
        newMessageText:
            {
                fontSize: SUBTEXT_FONT_SIZE - 3,
                fontFamily: TEXT_FONT_BOLD,
                color: 'white',
            }


    }
);
