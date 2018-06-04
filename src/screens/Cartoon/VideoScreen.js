import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    ImageBackground
} from 'react-native'

var {height, width} = Dimensions.get('window');

import {
    BACKGROUND_COLOR,
    H1_FONT_SIZE,
    ON_SURFACE_COLOR,
    SUBTEXT_FONT_SIZE,
    SURFACE_COLOR,
    TEXT_FONT_REGULAR
} from "../../config/const";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoIcon from 'react-native-vector-icons/Ionicons'
import YouTube from 'react-native-youtube'
import emotionArray from "./emotionArray";
import EmotionFly from "../../components/EmotionFly";
import {Icon} from 'react-native-elements'
import globalStore from "../../store/global";
import EmotionButton from "../../components/EmotionButton/EmotionButton";
var {width, height} = Dimensions.get('window');
export default class CartoonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('data', {}),
            otherEmotionArray: emotionArray,
            like: {
                state: false,
                number: 30
            },
            happy: {
                state: true,
                number: 30
            },
            sad: {
                state: false,
                number: 30
            },
            heart: {
                state: false,
                number: 30
            }
        };
        globalStore.register('VideoScreen', (s) => this.setState(s),
            () => {
                return this.state
            });
    }


    renderEmotions = () => {
        return (
            this.state.otherEmotionArray.map(emotion =>
                <EmotionButton emotion={emotion} key={emotion.id}/>
            )
        )
    };


    componentDidMount() {
    }


    onEmotionPress(data) {
        if (data === "like") {
            let like = this.state.like;
            like.state = !this.state.like.state;
            this.setState({like: like});
        }
        if (data === "heart") {
            let heart = this.state.heart;
            heart.state = !this.state.heart.state;
            this.setState({heart: heart});
        }
        if (data === "happy") {
            let happy = this.state.happy;
            happy.state = !this.state.happy.state;
            this.setState({happy: happy});
        }
        if (data === "sad") {
            let sad = this.state.sad;
            sad.state = !this.state.sad.state;
            this.setState({sad: sad});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.header} source={require('../../../src/assets/images/emptyHeader.png')}>
                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.goBack()}}
                        style={{justifyContent: 'center', alignItems: 'center', height: '100%', aspectRatio: 1}}>
                        <Icon name="keyboard-arrow-left" size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{this.state.data.youtubeVideoTitle}</Text>
                </ImageBackground>

                <YouTube
                    apiKey="AIzaSyDqt321ujzJxuXkWDNEmyx3CcVQkoewvxI"
                    videoId={this.state.data.youtubeVideoId}   // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={false}       // control whether the video should play in fullscreen or inline
                    loop={true}             // control whether the video should loop when ended
                    onError={e => console.log(e)}
                    style={{alignSelf: 'stretch', height: height/2}}
                />

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.actionContainer, {backgroundColor: (this.state.like.state === true) ? '#4080FF' : BACKGROUND_COLOR}]}
                        onPress={() => this.onEmotionPress("like")}>
                        <IoIcon style={styles.actionIcon} name="md-thumbs-up" size={35}
                                color={(this.state.like.state === true) ? BACKGROUND_COLOR : ON_SURFACE_COLOR}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionContainer, {backgroundColor: (this.state.heart.state === true) ? '#F25268' : BACKGROUND_COLOR}]}
                        onPress={() => this.onEmotionPress("heart")}>
                        <IoIcon style={styles.actionIcon} name="md-heart" size={35}
                                color={(this.state.heart.state === true) ? BACKGROUND_COLOR : ON_SURFACE_COLOR}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionContainer, { backgroundColor: (this.state.happy.state === true) ? '#f1c40f' : BACKGROUND_COLOR}]}
                        onPress={() => this.onEmotionPress("happy")}>
                        <IoIcon style={styles.actionIcon} name="md-happy" size={35}
                                color={(this.state.happy.state === true) ? 'black' : ON_SURFACE_COLOR}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionContainer, { backgroundColor: (this.state.sad.state === true) ? '#f1c40f' : BACKGROUND_COLOR}]}
                        onPress={() => this.onEmotionPress("sad")}>
                        <IoIcon style={styles.actionIcon} name="md-sad" size={35}
                                color={(this.state.sad.state === true) ? 'black' : ON_SURFACE_COLOR}/>
                    </TouchableOpacity>
                </View>
                {this.renderEmotions()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: BACKGROUND_COLOR},
    header: {flexDirection: 'row', width: '100%', aspectRatio:5, alignItems: 'center'},
    headerText: {fontWeight: 'bold', marginLeft: '2%', fontSize: 25, color: 'black'},
    videoContainer: {flex: 1},
    footer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: SURFACE_COLOR,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    actionContainer: {
        margin: '3%', justifyContent: 'center', alignItems: 'center',
        borderRadius: 100, elevation: 10, padding: '1%',
    },
    actionText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
    },
    actionIcon: {},
    actionMenuButton: {
        marginLeft: 'auto', marginRight: '2%'
    },
});
