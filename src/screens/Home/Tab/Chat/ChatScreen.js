import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import GridView from 'react-native-super-grid';
import PTRView from 'react-native-pull-to-refresh';
import realtime from "../../../../store/realtime"

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
    Keyboard,
    Modal, ReactNativeType as findNodeHandle,
} from 'react-native'
import {
    BACKGROUND_COLOR,
    H1_FONT_SIZE,
    ON_BACKGROUND_COLOR,
    ON_SURFACE_COLOR,
    PRIMARY_COLOR,
    SURFACE_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_HEAVY,
    TEXT_FONT_LIGHT, TEXT_FONT_MEDIUM
} from "../../../../config/const";
import globalStore from "../../../../store/global";
import SlidingUpPanel from "rn-sliding-up-panel";
import ChatSlidingUpContent from "../../../../components/SlidingUpContent/ChatSlidingUpContent";
import TimerCountdown from "react-native-timer-countdown";


var generatorId = 4;
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


const emptyMessage = {
    messageId: '?',
    id: "?"
};
var messages = [];
const stickers = [
    'https://media.giphy.com/media/3o7abpAFEkSGg2UiEE/giphy.gif',
    'https://media.giphy.com/media/vNU5PyxaM8bBu/giphy.gif',
    'https://media.giphy.com/media/89asT84PzDwwE/giphy.gif',
    'https://media.giphy.com/media/3o72FiXBdWRy3aZHJm/giphy.gif',
    'https://media.giphy.com/media/wAWBCV4jef5Ti/giphy.gif',
    'https://media.giphy.com/media/l2QZZOWmMM6tbBvFK/giphy.gif',
    'https://media.giphy.com/media/3o7abpAFEkSGg2UiEE/giphy.gif',
    'https://media.giphy.com/media/vNU5PyxaM8bBu/giphy.gif',
    'https://media.giphy.com/media/89asT84PzDwwE/giphy.gif',
    'https://media.giphy.com/media/3o72FiXBdWRy3aZHJm/giphy.gif',
    'https://media.giphy.com/media/wAWBCV4jef5Ti/giphy.gif',
    'https://media.giphy.com/media/l2QZZOWmMM6tbBvFK/giphy.gif',
    'https://media.giphy.com/media/3o7abpAFEkSGg2UiEE/giphy.gif',
    'https://media.giphy.com/media/vNU5PyxaM8bBu/giphy.gif',
    'https://media.giphy.com/media/89asT84PzDwwE/giphy.gif',
    'https://media.giphy.com/media/3o72FiXBdWRy3aZHJm/giphy.gif',
    'https://media.giphy.com/media/wAWBCV4jef5Ti/giphy.gif',
    'https://media.giphy.com/media/l2QZZOWmMM6tbBvFK/giphy.gif',
    'https://media.giphy.com/media/3o7abpAFEkSGg2UiEE/giphy.gif',
    'https://media.giphy.com/media/vNU5PyxaM8bBu/giphy.gif',
    'https://media.giphy.com/media/89asT84PzDwwE/giphy.gif',
    'https://media.giphy.com/media/3o72FiXBdWRy3aZHJm/giphy.gif',
    'https://media.giphy.com/media/wAWBCV4jef5Ti/giphy.gif',
    'https://media.giphy.com/media/l2QZZOWmMM6tbBvFK/giphy.gif',
];
const members = ["Kien", "Phong", "Nam", "Phuc"];
const events = [];

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kidId: globalStore.loadData('CurrentKid').kid.id,
            id: globalStore.loadData('loginInfo').userId,
            guestName: '',
            currentMessage: '',
            selectedID: '',
            showDetailMessage: false,
            textInputWidth: new Animated.Value(2.5),
            isFocus: false,
            textSize: new Animated.Value(0),
            openSticker: false,
            messages: messages,
            events: events,
            shouldScroll: true,
            slidingUpVisible: false,
            slidingUpOpenStickersVisible: false,
            currentChatRoomId: this.props.navigation.state.params.ChatId,
            previousBefore: '',
            previousSentMessageId: '',
            selectedStickerPackId: '',
            openDetailSticker: false,
            startTime: 0,
            selectedAnswer:'',
            stickers:[],
            answers:[
                {
                    key: 'dog',
                    url: 'http://www.heloisaamante.com.br/press/wp-content/uploads/2018/02/goldie.jpg'
                },
                {
                    key: 'cat',
                    url: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350'
                },
                {
                    key: 'mouse',
                    url: 'https://cdn.shopify.com/s/files/1/0748/9103/products/5561-Mouse-white.jpg?v=1426884286',
                },
            ],
            leadersBoard: [
                {
                    score: 100,
                    url: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    score: 50,
                    url: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    score: 1,
                    url: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    score: 100,
                    url: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    score: 99,
                    url: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
            ],
            listStickers: [
                {
                    name: 'STICKER 1',
                    urlStickers: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    name: 'STICKER 2',
                    urlStickers: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                },
                {
                    name: 'STICKER 3',
                    urlStickers: 'https://static.bongda24h.vn/medias/mobile/2018/5/6/ronaldo-phat-bieu-ve-real-va-neymar.jpg'
                }
            ],
        };

        globalStore.register('ChatDetail', (s) => this.setState(s),
            () => {
                return this.state
            });

        this.renderMessagesView = this.renderMessagesView.bind(this);
        this.renderInputView = this.renderInputView.bind(this);
        this.renderImageMessage = this.renderImageMessage.bind(this);
        this.renderTextMessage = this.renderTextMessage.bind(this);
        this.renderStickerMessage = this.renderStickerMessage.bind(this);
        this.renderMessageAdapter = this.renderMessageAdapter.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBottomUp = this.renderBottomUp.bind(this);
        this.renderSlidingUpOption = this.renderSlidingUpOption.bind(this);
        this.renderSlidingUpOpenStickers = this.renderSlidingUpOpenStickers.bind(this);
        this.renderLeadersBoard = this.renderLeadersBoard.bind(this);
        this.renderMath = this.renderMath.bind(this);
        this.renderEnglish = this.renderEnglish.bind(this);
        this.renderContestStart = this.renderContestStart.bind(this);
        this.renderContestEnd = this.renderContestEnd.bind(this);

        console.log('IDDDDDDDDDE: ' + globalStore.loadData('loginInfo').userId);
        console.log('ASSESS SDSD SD S DS DS: ' + globalStore.loadData('loginInfo').accessToken);
    }

    componentDidUpdate() {
        realtime.autoreconnect();
    }


    mapMessages(myMessages) {
        messages.pop();
        messages.reverse();
        for (let i = 0; i < myMessages.length; i++) {
            var message = {
                messageId: myMessages[i].id,
                chatId: myMessages[i].roomId,
                image: 'https://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_101541444.jpg',
                name: myMessages[i].kid.fullName,
                type: myMessages[i].type,
                sendTime: myMessages[i].sendTime,
                text: myMessages[i].message,
                id: myMessages[i].kid.id,
            };
            messages.push(message);
        }
        messages.reverse();
        messages.push(emptyMessage);
    }

    answerQuestion(option, id){
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id +'/rooms/' + this.state.currentChatRoomId + '/answer?option-id='+option + '&question-id=' +id,
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
                    res.data.then(data => {
                        console.log("ANSWERRRRRRRRRRRRRRRRRR");
                        console.log(option);
                        console.log(data.correct);
                        if(data.correct)
                        {
                            let index=messages.findIndex(item=>item.messageId==id);
                            messages[index].messageId= '????';

                            this.setState({
                                messages:messages,
                            })
                        }
                        else {
                            let index=messages.findIndex(item=>item.messageId==id);
                            messages[index].messageId= '?????';

                            this.setState({
                                messages:messages,
                            })
                        }
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

    connectRealTime()
    {
        const accessToken =  globalStore.loadData('loginInfo').accessToken;
        realtime.connect(globalStore.loadData('loginInfo').userId, accessToken);

        realtime.on("NEW_MESSAGE", this, (data)  => {

            console.log(data);
            if(data.kid.id == this.state.kidId || data.roomId != this.state.currentChatRoomId)
                return;
            this.receiveRealTimeMessage(data);
        })
    }

    receiveRealTimeMessage(data) {
        console.log('data IDDDDDDDDDDDDDDDDD');
        console.log(data.id);

        var message = {
            messageId: data.id,
            chatId: data.roomId,
            image: 'https://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_101541444.jpg',
            name: data.kid.fullName,
            type: (data.type == 'CHALLENGE_QUESTION') ? data.question.type : data.type,
            sendTime: data.sendTime,
            text: data.message,
            id: data.kid.id,
            question: (data.type == 'CHALLENGE_QUESTION') ? data.question.question : '',
            math: (data.type == 'CHALLENGE_QUESTION') ? data.question.math : '',
            optionIds: (data.type == 'CHALLENGE_QUESTION') ? data.question.optionIds : '',
            optionDisplays: (data.type == 'CHALLENGE_QUESTION') ? data.question.optionDisplays : '',
        };

        messages.pop();
        messages.push(message, emptyMessage);
        this.setState({
                messages: messages,
                shouldScroll: true,
            },
        );
    }

    renderMath(data){
        return(
            <View style={{
                width:200,
                height:200,
                backgroundColor: '#f1c40f',
                alignItems:'center'
            }}>
                <Text style={[styles.text,{fontSize:15}]}>{(data.messageId != '????' && data.messageId != '?????') ? data.question : (data.messageId == '?????' ? "SAI" : 'ĐÚNG')}</Text>
                <Text style={styles.text}>{data.math}</Text>
                {
                    (data.messageId != '????' && data.messageId != '?????') ? <View style = {{flexDirection:'row', justifyContent:'center', marginTop:'auto'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                console.log('NEEEEEEEEEEEEEEEEEEEEEEEEEE');
                                console.log(data.messageId);
                                this.answerQuestion(0,data.messageId);
                            }}
                            style={{
                                marginBottom:20,
                                borderRadius: 5,
                                alignItems:'center',
                                justifyContent:'center',
                                width:60,
                                height:60,
                                backgroundColor:BACKGROUND_COLOR
                            }}
                        >
                            <Icon name="md-close" size={50}
                                  color='red'/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.answerQuestion(1,data.messageId);
                            }}
                            style={{
                                marginBottom:20,
                                borderRadius: 5,
                                marginLeft:5,
                                alignItems:'center',
                                justifyContent:'center',
                                width:60,
                                height:60,
                                backgroundColor:BACKGROUND_COLOR
                            }}
                        >
                            <Icon name="md-checkmark" size={50}
                                  color='blue'/>
                        </TouchableOpacity>
                    </View> : <View/>
                }
            </View>
        )
    }

    loadMoreData() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/rooms/' + this.state.currentChatRoomId + '/messages?before=' + this.state.previousBefore + '&limit=5',
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
                    res.data.then(data => {
                        this.mapMessages(data.messages);
                        this.setState({
                            messages: messages,
                            previousBefore: data.next.before,
                        });
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

    loadMetaData() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/rooms/' + this.state.currentChatRoomId,
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
                    res.data.then(data => {

                        this.setState({
                            startTime: data.startTime,
                            guestName: data.name,
                        });
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

    loadInitData() {
        messages = [];

        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/rooms/' + this.state.currentChatRoomId + '/messages?before=' + (new Date()).getTime() + '&limit=100',
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
                    res.data.then(data => {
                        this.mapMessages(data.messages);
                        this.setState({
                            messages: messages,
                            previousBefore: data.next.before,
                        });
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

    componentDidMount() {
        this.connectRealTime();
    }

    componentWillMount() {
        this.loadMetaData();
        this.loadInitData();
        this.loadStickerPacks();
    }

    loadDetailPack(id) {

        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/sticker-packs/' + id + '/stickers?limit=20',
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
                    res.data.then(data => {
                        this.setState({
                            stickers: data.stickers,
                        });
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

    loadStickerPacks() {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/sticker-packs',
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
                    res.data.then(data => {
                        this.setState({
                            listStickers: data,
                        });
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

    renderLeadersBoard() {
        return (
            <ScrollView
                keyboardShouldPersistTaps={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {
                    this.state.leadersBoard.map(data => {
                        return (
                            <TouchableOpacity
                                style={[styles.rowContainer, {
                                    flexDirection: 'column',
                                    width: 70,
                                    marginHorizontal: -1,
                                }]}
                                onPress={() => {
                                }}>
                                <Image style={{
                                    width: 48,
                                    aspectRatio: 1,
                                    borderRadius: 50,
                                    marginTop: 13
                                }}
                                       source={{uri: data.url,}}/>
                                <View style={{
                                    flexDirection: 'column',
                                    width: 48,
                                    height: 23,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#13d58f",
                                    borderRadius: 8,
                                    marginTop: 1
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: TEXT_FONT_MEDIUM,
                                        color: "white"
                                    }}>{data.score}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    width: 36,
                                    height: 18,
                                    marginTop: -78,
                                    marginLeft: 33,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#ffcd52",
                                    borderRadius: 5,
                                }}>
                                    <Text style={{
                                        fontSize: 11,
                                        fontFamily: TEXT_FONT_MEDIUM,
                                        color: "white"
                                    }}>10th</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        )
    }

    renderSlidingUpOpenStickers() {
        return (
            <SlidingUpPanel
                visible={this.state.slidingUpOpenStickersVisible}
                allowDragging={false}
                onRequestClose={() => {
                    this.setState({
                        slidingUpOpenStickersVisible: false,
                        openDetailSticker: false,
                    })
                }}
                ref={panel => this._panel2 = panel}
                height={Dimensions.get('window').height * 0.7}
                draggableRange={{top: Dimensions.get('window').height * 0.7, bottom: 50}}>

                <View style={styles.bottom}>
                    {
                        (this.state.openDetailSticker) ?
                            <View/> :

                            <View/>
                            //<View style={styles.searchTextContainer}>
                              //  <Icon style={styles.headerIcon} name="md-search" size={H1_FONT_SIZE}
                               //       color={ON_SURFACE_COLOR}/>
                                //<TextInput style={styles.searchText} placeholder="Search"
                                  //         underlineColorAndroid='transparent'
                                ///>
                    }
                    {
                        (this.state.openDetailSticker) ? <GridView
                            style={{backgroundColor: ON_SURFACE_COLOR}}
                            items={this.state.stickers}
                            itemDimension={70}
                            spacing={1}
                            renderItem={item => {
                                for (var b in item) {
                                    if (b == 'fixedHeightGif') {
                                        var newData = item[b].url;
                                        break;
                                    }
                                }
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.sendSticker(item);
                                        }}>
                                        <Image style={{width: 120, height: 70}} source={{uri: newData}}/>
                                    </TouchableOpacity>
                                )
                            }}
                        /> : <ScrollView
                            keyboardShouldPersistTaps={true}
                        >
                            {
                                this.state.listStickers.map(data => {
                                    for (var b in data.featuredGif) {
                                        if (b == 'fixedHeightGif') {
                                            var newData = data.featuredGif[b].url;
                                        }
                                    }
                                    return (
                                        <TouchableOpacity
                                            style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                            onPress={() => {
                                                this.setState({
                                                    selectedStickerPackId: data.id,
                                                    openDetailSticker: true,
                                                });
                                                this.loadDetailPack(data.id);
                                            }}
                                        >
                                            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{
                                                uri: newData,
                                            }}/>
                                            <View style={{flexDirection: 'column', padding: 5}}>
                                                <Text>{data.shortDisplayName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>
                    }

                    <TouchableOpacity
                        style={{backgroundColor: PRIMARY_COLOR, marginBottom: 50, height: 30}}
                        onPress={() => {
                            this.slidingUpOpenStickersControl();
                        }}
                    >
                        <Text style={[styles.buttonText, {color: BACKGROUND_COLOR}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </SlidingUpPanel>
        )
    }

    slidingUpOpenStickersControl() {
        Keyboard.dismiss();
        if (this.state.slidingUpOpenStickersVisible === false)
            this.setState({
                slidingUpOpenStickersVisible: true,
                openDetailSticker: false,
            });
        else
            this.setState({
                slidingUpOpenStickersVisible: false,
                openDetailSticker: false,
            });
    }

    slidingUpControl() {
        Keyboard.dismiss();
        if (this.state.slidingUpVisible === false)
            this.setState({
                slidingUpVisible: true,
            });
        else
            this.setState({
                slidingUpVisible: false,
            });
    }

    UploadCurrentMessage() {

        if (this.state.currentMessage === '')
            return;
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + globalStore.loadData('CurrentKid').kid.id + '/rooms/' + this.state.currentChatRoomId + '/messages',
            {
                method: 'POST',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    "type": "TEXT",
                    "message": this.state.currentMessage,
                }),
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
                    res.data.then(data => {

                        this.sendCurrentMessage(data);
                    });
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

    sendCurrentMessage(data) {
        if (this.state.currentMessage === '')
            return;

        var message = {
            sendTime: parseInt(data.sendTime, 10),
            messageId: data.messageId,
            image: "",
            name: "user",
            text: this.state.currentMessage,
            type: 'TEXT',
            url: '',
            id: globalStore.loadData('CurrentKid').kid.id,
        };
        messages.pop();
        messages.push(message, emptyMessage);

        this.setState({
                previousSentMessageId: data.messageId,
                messages: messages,
                currentMessage: '',
                shouldScroll: true,
                maxWidth: {
                    width: '50%',
                }
            },
        );
        this.scrollToBottom();
    }

    onFocus() {
        if (this.state.isFocus === false) {
            this.setState({
                isFocus: true,
                openSticker: false,
            });
        }
        Animated.timing(
            this.state.textInputWidth,
            {
                toValue: 6,
                duration: 100,
            }
        ).start();
    }

    hideMedia() {
        this.setState({
            isFocus: true,
        })
        Animated.timing(
            this.state.textInputWidth,
            {
                toValue: 6,
                duration: 100,
            }
        ).start();
    }

    onBlur() {
        if (this.state.isFocus === true) {
            this.setState({
                isFocus: false
            });
        }
        Animated.timing(
            this.state.textInputWidth,
            {
                toValue: 2.5,
                duration: 100,
            }
        ).start();
    }

    openCamera() {
        ImagePicker.launchCamera(options, (response) => {

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
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                var message = {
                    messageId: ++generatorId,
                    image: "data:image/jpeg;base64,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",
                    name: "Map",
                    text: this.state.currentMessage,
                    type: 'image',
                    url: source,
                    id: "2",
                };
                messages.push(message);
                this.setState({
                    messages: messages,
                    shouldScroll: true,
                });
            }
        });
    }

    openGallery() {
        ImagePicker.launchImageLibrary(options, (response) => {

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
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                var message = {
                    messageId: ++generatorId,
                    image: "data:image/jpeg;base64,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",
                    name: "Map",
                    text: this.state.currentMessage,
                    type: 'image',
                    url: source,
                    id: "2",
                };
                messages.push(message);
                this.setState({
                    messages: messages,
                    shouldScroll: true,
                });
            }
        });
    }

    showDateTime(data) {
        _this = this;
        if (!this.state.showDetailMessage) {
            this.setState({
                selectedID: data.messageId,
                showDetailMessage: true,
            })
            Animated.timing(
                this.state.textSize,
                {
                    toValue: 10,
                    duration: 200,
                }
            ).start();
        }
        else {
            Animated.timing(
                this.state.textSize,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start(function whenComplete() {
                _this.setState({
                    selectedID: data.messageId,
                    textSize: new Animated.Value(0),
                    showDetailMessage: false,
                })
            })

        }
    }

    scrollToBottom = () => {
        if (!this.state.shouldScroll)
            return;
        this.scrollView.scrollToEnd();
    };

    sendSticker(item) {
        var message = {
            messageId: ++generatorId,
            image: "data:image/jpeg;base64,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",
            name: "Map",
            text: '',
            type: 'sticker',
            url: item,
            id: "2",
        };
        messages.push(message);
        this.setState({
            messages: messages,
            shouldScroll: true,
        });
        this.scrollToBottom();
    }

    openSticker() {
        if (this.state.openSticker === false) {
            this.setState({
                openSticker: true,
            });
            Keyboard.dismiss();
        }
        else {
            this.setState({
                openSticker: false,
            });
            this.secondTextInput.focus();
        }
    }

    openChatMenu() {
        this.props.navigation.navigate('ChatMenu', {ChatId: this.state.currentChatRoomId});
    }


    renderSlidingUpOption() {
        return (
            <SlidingUpPanel
                visible={this.state.slidingUpVisible}
                allowDragging={false}
                onRequestClose={() => {
                    this.setState({slidingUpVisible: false})
                }}
                ref={panel => this._panel = panel}
                height={Dimensions.get('window').height * 0.3}
                draggableRange={{top: Dimensions.get('window').height * 0.3, bottom: 80}}>

                <ChatSlidingUpContent
                    onOpenStickersPress={() => {
                        this.slidingUpOpenStickersControl();
                        this.slidingUpControl();
                    }}
                    onCancelPress={() => {
                        this.slidingUpControl();
                    }}/>
            </SlidingUpPanel>
        )
    }

    renderContestEnd() {
        return (
            <View style={{
                width: 200,
                height: 100,
                backgroundColor: '#FFE0E0',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{color: '#EB5757'}}>Cuộc thi kết thúc</Text>
            </View>
        )
    }

    renderMessagesView(dataSource, members) {
        return (
            <View style={{flex:1}}>

                <ScrollView
                    onContentSizeChange={() => {
                        this.scrollToBottom();
                    }}
                    ref={ref => this.scrollView = ref}>
                    {
                        dataSource.map(data => {
                            if (data.id === '?') {
                                return;
                            }
                            return (
                                <View style={styles.rowContainer} key={data.messageId}>
                                    {
                                        (data.messageId === this.state.selectedID && this.state.showDetailMessage) ?
                                            <Animated.Text
                                                style={[styles.dateTime, {fontSize: this.state.textSize}]}>{(new Date(data.sendTime)).toString()}</Animated.Text> :
                                            <View/>
                                    }
                                    <View style={[data.id === this.state.kidId ? styles.messageMe : styles.messageYou, {
                                        flexDirection: 'row',
                                        backgroundColor: BACKGROUND_COLOR
                                    }]}>
                                        {
                                            (data.id !== this.state.kidId && data.id !== this.state.messages[this.state.messages.indexOf(data) + 1].id) ?
                                                <Image style={styles.avata} source={{uri: data.image}}/> :
                                                <View style={{width: 50}}/>
                                        }
                                        <TouchableOpacity
                                            style={[data.id === this.state.kidId ? styles.messageYou : styles.messageMe, (data.text.length > 28) ? {width: '70%'} : {}]}
                                            activeOpacity={1}
                                            onPress={() => {
                                                this.showDateTime(data);
                                                this.setState({
                                                    shouldScroll: false,
                                                });
                                            }}
                                        >
                                            {this.renderMessageAdapter(data)}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>

                {
                    (this.state.currentMessage[this.state.currentMessage.length - 1] === '@') ? <View>
                        <ScrollView
                            keyboardShouldPersistTaps={true}
                        >
                            {
                                members.map(data => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                            onPress={() => {
                                                this.setState(previousState => {
                                                    return ({
                                                        ...previousState,
                                                        currentMessage: previousState.currentMessage + data,
                                                    })
                                                })
                                            }}
                                        >
                                            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{
                                                uri: 'data:image/jpeg;base64,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'
                                            }}/>
                                            <View style={{flexDirection: 'column', padding: 5}}>
                                                <Text>{data}</Text>
                                                <Text style={{fontSize: 10}}>biệt danh</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>
                    </View> : <View/>
                }
            </View>
        )
    }

    renderBottomUp() {
        return (
            <View style={styles.bottom}>
                <GridView
                    itemDimension={50}
                    items={stickers}
                    renderItem={item => (
                        <TouchableOpacity
                            onPress={() => {
                                this.sendSticker(item);
                            }}
                        >
                            <Image style={{width: 50, height: 50}} source={{uri: item}}/>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    renderHeader(data) {
        return (
            <View style={styles.header}
                  elevation={2}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    style={[styles.goBack, {flex: 1}]}>
                    <Entypo
                        name={"chevron-left"}
                        size={35}
                        color={"black"}/>
                </TouchableOpacity>
                <View
                    style={{flex: 7, alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity
                        style={styles.insideHeader}
                        onPress={() => {
                            //this.openChatMenu();
                        }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: TEXT_FONT_HEAVY,
                            color: "black"
                        }}>{this.state.guestName}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flex: 1.2, height: "100%", justifyContent: "flex-end"}}>
                    <TimerCountdown
                        initialSecondsRemaining={this.state.startTime - (new Date()).getTime()}
                        onTick={() => {
                        }}
                        onTimeElapsed={() => {
                        }}
                        allowFontScaling={true}
                        style={{fontSize: 17}}/>
                </View>
            </View>
        )
    }

    renderTextMessage(text, id) {
        return (
            <View style={styles.messageTextType}>
                <Text style={{
                    color: (this.state.kidId === id) ? BACKGROUND_COLOR : ON_BACKGROUND_COLOR,
                    fontFamily: TEXT_FONT_LIGHT,
                }}>{text}</Text>
            </View>
        )
    }

    renderImageMessage(url) {
        return (
            <View>
                <Image style={styles.messageImage} source={url}/>
            </View>
        )
    }

    renderStickerMessage(url) {
        return (
            <View>
                <Image style={styles.messageImage} source={{uri: url}}/>
            </View>
        )
    }

    addEnglish() {
        var message = {
            messageId: '???',
            id: "???",
            type: 'ENGLISH',
            text: 'aaa'
        };
        messages.pop();
        messages.push(message, emptyMessage);

        this.setState({
            messages: messages,
        })
    }

    addMath() {
        var message = {
            messageId: '??',
            id: "??",
            type: 'MATH',
            text: 'aaa'
        };
        messages.pop();
        messages.push(message, emptyMessage);

        this.setState({
            messages: messages,
        })
    }

    renderEnglish() {
        return (
            <View style={{
                width: 200,
                height: 250,
                backgroundColor: '#f1c40f',
                alignItems: 'center'
            }}>
                <Text style={styles.text}>DOG</Text>
                <ScrollView>
                    {
                        this.state.answers.map(data => {
                            return (
                                <TouchableOpacity
                                    style={[styles.rowContainer, {flexDirection: 'row', padding: 5}]}
                                    onPress={() => {

                                    }}
                                >
                                    <Image style={{width: 50, height: 50, borderRadius: 25}} source={{
                                        uri: data.url,
                                    }}/>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
        )
    }


    renderMessageAdapter(message) {
        switch (message.type) {
            case "image":
                return (
                    this.renderImageMessage(message.url)
                );
            case 'TEXT':
                return (
                    this.renderTextMessage(message.text, message.id)
                );
            case "sticker":
                return (
                    this.renderStickerMessage(message.url)
                );
            case 'MATH':
                return (
                    this.renderMath(message)
                );
            case 'ENGLISH':
                return (
                    this.renderEnglish()
                );
            case 'CHALLENGE_START':
                return (
                    this.renderContestStart()
                );
            case 'CHALLENGE_END':
                return (
                    this.renderContestEnd()
                );
        }
    }


    renderContestStart() {
        return (
            <View style={{
                width: 200,
                height: 100,
                backgroundColor: '#BFECD2',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{color: '#219653'}}>Cuộc thi bắt đầu</Text>
            </View>
        )
    }

    renderInputView() {
        return (
            <View style={styles.inputContainer}>
                <View style={{flexDirection: 'row', flex: 8}}>
                    <Animated.View style={[styles.textInputView, {flex: 8}]}>
                        <TextInput
                            autoCorrect={false}
                            ref={(input) => {
                                this.secondTextInput = input;
                            }}
                            onBlur={() => this.onBlur()}
                            onFocus={() => this.onFocus()}
                            placeholder={' Tin nhắn ...'}
                            multiline={true}
                            underlineColorAndroid={SURFACE_COLOR}
                            style={styles.messageInput}
                            onChangeText={(text) => {
                                this.setState({currentMessage: text});
                            }}
                            onContentSizeChange={this._onContentSizeChange}
                            value={this.state.currentMessage}
                        >
                        </TextInput>
                    </Animated.View>
                </View>
                <View style={styles.optionChat}>
                    <TouchableOpacity style={styles.media}
                                      onPress={() => {
                                          this.slidingUpControl();
                                      }}>
                        <Icon name="md-add-circle" size={43} color='#13d58f'/>
                    </TouchableOpacity>
                </View>

                <View style={[styles.optionChat]}>
                    <TouchableOpacity
                        style={[styles.messageButtonSend, {marginLeft: -4}]}
                        onPress={() => {
                            this.UploadCurrentMessage();
                        }}>
                        <Entypo name="controller-play" size={53} color="#47e0eb"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {this.renderHeader()}
                </View>
                <View style={styles.leadersBoardContainer}
                      elevation={0.1}>
                    {this.renderLeadersBoard()}
                </View>
                <View
                    style={styles.messagesContainer}>
                    {this.renderMessagesView(this.state.messages, members)}
                </View>
                <View style={styles.inputContainer}
                      elevation={3}>
                    {this.renderInputView()}
                </View>
                {this.renderSlidingUpOption()}
                {this.renderSlidingUpOpenStickers()}
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
    messageMe: {
        marginLeft: 5,
        marginLeft: 'auto',
        backgroundColor: SURFACE_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 3,
    },
    messageYou: {
        marginRight: 'auto',
        backgroundColor: '#4F8EF7',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 3,
    },
    messagesContainer: {
        flex: 9,
        backgroundColor: BACKGROUND_COLOR,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: BACKGROUND_COLOR,
        width: '100%',
        height: 60,
    },
    messageName: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    messageInput: {
        backgroundColor: "white",
        fontSize: 18,
        fontFamily: TEXT_FONT_LIGHT,
        marginLeft: 10
    },
    messageButtonSend: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        alignItems: 'center',
    },
    dateTime: {
        fontSize: 10
    },
    messageImage: {
        width: 100,
        height: 100,
        borderRadius: 3
    },
    textInputView: {
        borderRadius: 0,
        flex: 8,
        backgroundColor: "white",
        marginTop: '2%',
        height: '90%'
    },
    optionChat: {
        flexDirection: 'row',
        flex: 1.3,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    media: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    avata: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 'auto'
    },
    header: {
        height: '100%',
        width: '100%',
        borderBottomWidth: 0,
        borderColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        padding: 10,
        backgroundColor: SURFACE_COLOR,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBack: {
        marginRight: 'auto',
        marginLeft: '1%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leadersBoardContainer: {
        position: 'absolute',
        width: '100%',
        height: 90,
        marginTop: 51,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    headerContainer: {
        width: '100%',
        height: 49,
    },
    messageTextType: {},
    bottomUpContainer: {
        width: '100%',
        height: 200,
    },
    messageButtonSticker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 17,
        marginLeft: -35,
    },
    insideHeader: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIcon: {
        alignSelf: 'center',
        margin: '2%'
    },
    searchTextContainer: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        height: 35,
        alignItems: 'center',
    },
    searchText: {
        flex: 1,
        fontSize: 10
    },
    text: {
        fontSize: 40,
        fontFamily: TEXT_FONT_BOLD,
        color: 'black',
    }
});
