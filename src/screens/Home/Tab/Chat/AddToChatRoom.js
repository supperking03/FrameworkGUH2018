import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, TextInput, ScrollView, Text, TouchableOpacity, Image} from "react-native";
import {
    BACKGROUND_COLOR, H3_FONT_SIZE, ON_BACKGROUND_COLOR, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR,
    SUBHEADING_FONT_SIZE, SUBTEXT_FONT_SIZE,
    SURFACE_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_MEDIUM,
    TEXT_FONT_REGULAR
} from "../../../../config/const";
import {Icon} from "react-native-elements";
import {PRIMARY_BUTTON_TWO} from "../../../../components/PrimaryButton";
import globalStore from "../../../../store/global";

export default class AddToChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                search: '',
                listResult: [],
                chatId: this.props.navigation.state.params.ChatId,
            };
        globalStore.register('addMember', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    LoadResult(filter) {
        var error = '';
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/search-user?pattern=' + filter,
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
                    //console.log(res);
                    this.setState({
                        listResult: res.results,
                    });
                }
            }).catch((error) => {
            console.error(error);

        })
    }

    addMember(guestId){
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/chats/' + this.state.chatId +'/add-user?user-id-list=' + guestId,
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
                if(response.status >= 400 && response.status <= 499) {
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
                if(res.status === 'succeeded') {
                    this.props.navigation.goBack();
                }
                else if(res.status === 'checked-user') {
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

    render() {
        const iconSize = Dimensions.get('window').height * 0.08;

        return (
            <View style={styles.container}>
                <View style={styles.searchView}>
                    <Icon name="search" size={iconSize * 0.6} color={BACKGROUND_COLOR}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Search'}
                        multiline={false}
                        maxLength={50}
                        underlineColorAndroid={ON_SURFACE_COLOR}
                        placeholderTextColor={ON_SURFACE_COLOR}
                        value={this.state.search}
                        onChangeText={(value) => {
                            this.setState({search: value});
                            if (value !== '') {
                                this.LoadResult(value);
                            }
                            else {
                                this.setState({listResult: []});
                            }
                        }}
                    />
                </View>
                <View style={styles.resultView}>
                    <ScrollView>
                        <View style={styles.result}>
                            <Text
                                style={styles.resultText}>About {this.state.listResult.length} {(this.state.listResult.length > 1) ? 'results' : 'result'}</Text>
                        </View>
                        {
                            this.state.listResult.map(result => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTT");
                                            this.addMember(result.userId);
                                        }}
                                        style={styles.chatItem}
                                        key={result.userId}>
                                        <Image
                                            style={styles.chatAvatar}
                                            source={{uri: (result.userAvatarUrl === null) ? 'https://i.quantrimang.com/photos/image/072015/22/avatar.jpg' : result.userAvatarUrl}}/>
                                        <View style={styles.chatContent}>
                                            <Text style={styles.nameText}>{result.userFullName}</Text>
                                            <Text style={styles.messageText}>{result.userNickName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: Dimensions.get('window').height,
                alignItems: 'center',
            },
        searchView:
            {
                width: '100%',
                height: '8%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: PRIMARY_BUTTON_TWO.color,
                paddingHorizontal: '3%',

            },
        textInput:
            {
                flex: 1,
                height: '80%',
                alignItems: 'center',
                color: BACKGROUND_COLOR,
                fontFamily: TEXT_FONT_MEDIUM,
                fontSize: PARAGRAPH_FONT_SIZE,
                paddingHorizontal: '3%',
            },

        resultView:
            {
                width: '100%',
                height: '92%',
                backgroundColor: BACKGROUND_COLOR
            },
        result:
            {
                margin: 16,
                marginRight: 'auto',
                justifyContent: 'center',
            },
        resultText:
            {
                fontFamily: TEXT_FONT_REGULAR,
                fontSize: SUBTEXT_FONT_SIZE,
                color: 'grey',
            },
        chatItem:
            {
                width: '100%',
                height: 75,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: BACKGROUND_COLOR,
            },
        chatAvatar:
            {
                height: '100%',
                aspectRatio: 1,
                borderRadius: 100,
                marginRight: 8,
            },
        chatContent:
            {
                width: '80%',
                height: '100%',
                justifyContent: 'center',
                padding: 8,
                marginLeft: 'auto',
            },
        nameText:
            {
                fontSize: PARAGRAPH_FONT_SIZE,
                fontFamily: TEXT_FONT_BOLD,
                color: 'black',
            },
        messageText:
            {
                fontSize: SUBHEADING_FONT_SIZE,
                fontFamily: TEXT_FONT_REGULAR,
                color: ON_SURFACE_COLOR,
            },

    }
);