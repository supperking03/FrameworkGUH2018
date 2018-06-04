import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text, ScrollView, Image, ImageBackground, TouchableOpacity} from "react-native";
import {
    BACKGROUND_COLOR,
    H1_FONT_SIZE, H3_FONT_SIZE, ON_BACKGROUND_COLOR, PARAGRAPH_FONT_SIZE, SURFACE_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "../config/const";
import globalStore from "../store/global";
import {Icon} from "react-native-elements";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const dataCartoon = [
    {
        time: '26/05/2018',
        actions:
            [
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'liked',
                    post: 'Phim Tom&Jerry tập 15',
                },
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'disliked',
                    post: 'Mr.Bean tập 3',
                },
                {
                    type: 'viewed',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    post: 'Phim Tom&Jerry tập 15',
                },
            ]
    },
    {
        time: '23/05/2018',
        actions:
            [
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'liked',
                    post: 'Hồ lô biến tập 1',
                },
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'disliked',
                    post: 'Upin & Ipin tập 3',
                },
            ]
    },


];

const dataGame = [
    {
        time: '26/05/2018',
        actions:
            [
                {
                    type: 'played',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    game: 'Nối chữ',
                    score: '40',
                },
                {

                    type: 'played',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    game: 'Giải đố tiếng anh',
                    score: '15',
                }
            ]

    },
    {
        time: '24/05/2018',
        actions:
            [
                {
                    type: 'played',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    game: 'Giải toán',
                    score: '17',
                },
                {

                    type: 'played',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    game: 'Giải đố tiếng anh',
                    score: '20',
                }
            ]

    }
];

const dataTV= [
    {
        time: '26/05/2018',
        actions:
            [
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'liked',
                    post: 'Quảng cáo cho bé cười',
                },
                {
                    type: 'reaction',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    emotionType: 'disliked',
                    post: 'Xiếc khỉ Remix',
                },
                {
                    type: 'viewed',
                    imageUrl: 'https://i.imgur.com/fj81k4g.png',
                    post: 'Bản lĩnh nhóc tì',
                },
            ]
    },
];

const dataToy =
    [
        {
            time: '26/05/2018',
            actions:
                [
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'liked',
                        post: 'Đồ chơi xếp hình mầm non Sato 72',
                    },
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'disliked',
                        post: 'Đồ chơi tháp hề gỗ Etic C401A',
                    },
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'liked',
                        post: 'Xe trượt Scooter 3 bánh',
                    },
                ]
        },
        {
            time: '25/05/2018',
            actions:
                [
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'liked',
                        post: 'Xe trượt Scooter 3 bánh',
                    },
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'disliked',
                        post: 'Đường luồn lý thú thông minh Winwin Toys',
                    },
                    {
                        type: 'reaction',
                        imageUrl: 'https://i.imgur.com/fj81k4g.png',
                        emotionType: 'disliked',
                        post: 'Đồ chơi rút gỗ khéo léo Winwin Toys 60142',
                    },
                ]
        },
    ];

var data = [];
export default class HistoryDetail extends Component {
    constructor(props) {
        super(props);
        globalStore.register('History', (s) => this.setState(s),
            () => {
                return this.state
            });
        switch (this.props.navigation.state.params.category)
        {
            case 'cartoon':
            {
                data = dataCartoon;
            };break;
            case 'toy':
            {
                data = dataToy;
            };break;
            case 'TV' :
            {
                data = dataTV;
            };break;
            case 'game':
            {
                data = dataGame;
            };break;
        }
    }


    renderAction(action) {
        switch (action.type) {
            case 'reaction': {
                return (
                    <View style={styles.action}
                          key={'1'}>
                        <Image
                            style={styles.actionAvatar}
                            source={{uri: globalStore.loadData('CurrentKid').kid.avatarImageUrl}}
                        />
                        <View style={styles.actionContent}>
                            <Text numberOfLines={3}>
                                <Text
                                    style={styles.actionText}>Bé {globalStore.loadData('CurrentKid').kid.fullName} </Text>
                                <Text
                                    style={styles.actionBoldText}>{(action.emotionType === 'liked') ? 'thích' : 'không thích'}</Text>
                                <Text style={styles.actionText}> </Text>
                                <Text style={styles.actionHighlightText}>{action.post}</Text>
                            </Text>
                        </View>
                    </View>
                );
            }
                ;
                break;
            case 'viewed': {
                return (
                    <View
                        key={'1'}
                        style={styles.action}>
                        <Image
                            style={styles.actionAvatar}
                            source={{uri: globalStore.loadData('CurrentKid').kid.avatarImageUrl}}
                        />
                        <View style={styles.actionContent}>
                            <Text numberOfLines={3}>
                                <Text
                                    style={styles.actionText}>Bé {globalStore.loadData('CurrentKid').kid.fullName} </Text>
                                <Text style={styles.actionBoldText}>Đã xem</Text>
                                <Text style={styles.actionText}> </Text>
                                <Text style={styles.actionHighlightText}>{action.post}</Text>
                            </Text>
                        </View>
                    </View>
                );
            }
                ;
                break;
            case 'played': {
                return (
                    <View
                        key={'1'}
                        style={styles.action}>
                        <Image
                            style={styles.actionAvatar}
                            source={{uri: globalStore.loadData('CurrentKid').kid.avatarImageUrl}}
                        />
                        <View style={styles.actionContent}>
                            <Text numberOfLines={3}>
                                <Text style={styles.actionText}>Bé {globalStore.loadData('CurrentKid').kid.fullName} </Text>
                                <Text style={styles.actionBoldText}>Đã tham gia trò chơi</Text>
                                <Text style={styles.actionText}> </Text>
                                <Text style={styles.actionHighlightText}>{action.game}</Text>
                                <Text style={styles.actionText}> và đạt được </Text>
                                <Text style={styles.actionBoldText}>{action.score}</Text>
                                <Text style={styles.actionText}> điểm</Text>
                            </Text>
                        </View>
                    </View>
                );
            }
                ;
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{uri: 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/33532235_668780196798992_7612469244533407744_n.png?_nc_cat=0&oh=46433d0444ec932348e765a99ab8c491&oe=5B81332B'}}
                    style={styles.header}>
                    <TouchableOpacity
                        style={{marginRight: 'auto'}}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Icon
                            name={"chevron-left"}
                            size={35}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.body}>
                    <ScrollView style={{flex: 1}}>
                        {
                            data.map(date => {
                                return (
                                    <View style={{width: '100%'}}
                                          key={'1'}>
                                        <View style={styles.timeDisplay}>
                                            <Text style={styles.timeText}>{date.time}</Text>
                                        </View>
                                        {
                                            date.actions.map(action => {
                                                return this.renderAction(action);
                                            })
                                        }
                                    </View>
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
                height: height,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
            },
        header:
            {
                width: '100%',
                height: '12%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            },
        body:
            {
                width: '100%',
                height: '84%',
                paddingBottom: '4%',
            },
        timeDisplay:
            {
                height: 50,
                width: '100%',
                paddingHorizontal: 5,
                borderBottomWidth: 1,
                borderColor: ON_BACKGROUND_COLOR,
            },
        timeText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H3_FONT_SIZE,
            },
        action:
            {
                width: '100%',
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
            },
        actionAvatar:
            {
                width: 70,
                aspectRatio: 1
            },
        actionContent:
            {
                width: '80%',
                flexDirection: 'row',
                paddingHorizontal: 5,
            },
        actionText:
            {
                fontFamily: TEXT_FONT_REGULAR,
                fontSize: H3_FONT_SIZE,
                color: ON_BACKGROUND_COLOR,
            },
        actionBoldText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H3_FONT_SIZE,
                color: ON_BACKGROUND_COLOR,
            },
        actionHighlightText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H3_FONT_SIZE,
                color: '#0D47A1'
            },

    }
)