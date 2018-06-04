import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

import {
    View,
    StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Image
} from 'react-native'
import {BACKGROUND_COLOR, ON_SURFACE_COLOR, SURFACE_COLOR, TEXT_FONT_LIGHT} from "../../../../config/const";
import globalStore from "../../../../store/global";

const emptyMessage = {
    messageId: '?',
    id: "?"
};

export default class ChatMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatId: this.props.navigation.state.params.ChatId,
            memberModalVisible: false,
            members:[],
        };
        globalStore.register('ChatMenu', (s) => this.setState(s),
            () => {
                return this.state
            });
        this.renderHeader = this.renderHeader.bind(this);
        this.renderOption = this.renderOption.bind(this);
    }

    addMember()
    {
        this.props.navigation.navigate('addMember',{ChatId:this.state.chatId})
    }

    MembersModalControl()
    {
        if(this.state.memberModalVisible == true)
        {
            this.setState({
                memberModalVisible: false,
            })
        }
        else {
            this.setState({
                memberModalVisible: true,
            })
        }
    }

    renderOption(){
        return(
            <ScrollView style={styles.optionContainer}>
                <TouchableOpacity style={[styles.specificOption, {padding: 10}]}>
                    <Image
                        style={{width: 30, height: 30, borderRadius: 15}}
                        source={{uri: 'data:image/jpeg;base64,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'}}
                    />
                    <View style={{flexDirection: 'column', marginLeft: 5, marginTop: -2.5}}>
                        <Text>Group name</Text>
                        <Text style={{fontSize: 10}}>Hoạt động hôm nay</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.emptyView}/>
                <TouchableOpacity
                    onPress={()=>{
                        this.addMember();
                    }}
                    style={styles.specificOption}
                >
                    <Icon size={30} name="ios-add"/>
                    <View style={[styles.specificOptionContainer, {marginLeft: 15}]}>
                        <Text>Thêm người</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.specificOption}
                    onPress={()=>{
                        this.MembersModalControl();
                    }}
                >
                    <Icon size={30} name="md-people"/>
                    <View style={styles.specificOptionContainer}>
                        <Text>Thành viên</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 'auto', marginRight: 10}}>
                        <Text>{this.state.members.length}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.emptyView}/>
                <TouchableOpacity
                    style={styles.specificOption}
                    onPress={() => {
                        this.addEvent();
                        this.props.navigation.goBack();
                    }}
                >
                    <Icon size={30} name="ios-calendar"/>
                    <View style={[styles.specificOptionContainer, {marginLeft: 15}]}>
                        <Text>Tạo sự kiện</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.specificOption}>
                    <Icon size={30} name="md-create"/>
                    <View style={styles.specificOptionContainer}>
                        <Text>Biệt danh</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.emptyView}/>
                <TouchableOpacity style={[styles.specificOption, {height: 50}]}>
                    <View style={styles.specificOptionContainer}>
                        <Text style={{color: 'red'}}>Rời khỏi nhóm</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }


    addEvent(){
        var events = globalStore.getStateOf("ChatScreen").events;
        var messages = globalStore.getStateOf("ChatScreen").messages;
        var message = {
            messageId: 999,
            image: 'http://emporiodohomem.net/loja/wp-content/uploads/2018/01/gravata.png',
            name: "Map",
            text: 'SU KIEN MOI NE',
            type: 'text',
            url: 'http://emporiodohomem.net/loja/wp-content/uploads/2018/01/gravata.png',
            id: "2",
        };

        events.push(message);
        messages.pop();
        messages.push(message, emptyMessage);
        globalStore.setStateOf("ChatScreen", {
            messages: messages,
            events: events,
        })
    }

    componentWillMount(){
        this.loadMetaData();
    }

    renderHeader(data) {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    style={styles.goBack}>
                    <Icon size={35} name="ios-arrow-round-back"/>
                </TouchableOpacity>
                <View
                    style={styles.insideHeader}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: TEXT_FONT_LIGHT}}>Group</Text>
                </View>
            </View>
        )
    }

    loadMetaData()
    {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/chats/' + this.state.chatId,
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
                    res.data.then(data => {
                        this.setState({
                            members:data.users,
                        });
                    })
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
        return (
            <View style={styles.container}>
                <Modal
                    style={{backgroundColor: BACKGROUND_COLOR}}
                    isVisible={this.state.memberModalVisible}
                >
                    <ScrollView
                        keyboardShouldPersistTaps={true}
                    >
                        {
                            this.state.members.map(data => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                        onPress={() => {
                                            this.setState({
                                                memberModalVisible:false,
                                            })
                                        }}
                                    >
                                        <Image style={{width: 30, height: 30, borderRadius: 15}} source={{
                                            uri: data.avatarImageUrl ,
                                        }}/>
                                        <View style={{flexDirection: 'column', padding: 5}}>
                                            <Text>{data.fullName}</Text>
                                            <Text style={{fontSize: 10}}>{data.nickName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </Modal>
                <View style={styles.headerContainer}>
                    {this.renderHeader()}
                </View>
                <View style={styles.optionContainer}>
                    {this.renderOption()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        height: Dimensions.get('window').height - 25
    },
    header: {
        height: '100%',
        width: '100%',
        borderBottomWidth: 0.6,
        borderColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        height: 50,
    },
    goBack: {
        marginRight: 'auto',
        marginLeft: '1%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    insideHeader: {
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionContainer: {
        flex: 1,
        backgroundColor: SURFACE_COLOR,
    },
    specificOption: {
        backgroundColor: BACKGROUND_COLOR,
        width: '100%',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    emptyView: {
        height: 25,
        backgroundColor: SURFACE_COLOR,
    },
    specificOptionContainer: {
        flexDirection: 'column',
        marginLeft: 5,
        width: '100%',
        height: '100%',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        borderColor: ON_SURFACE_COLOR,
    }
});
