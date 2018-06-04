import React, {Component} from 'react'
import {
    View, TouchableOpacity, Text, Image, StyleSheet, ListView, TextInput, ScrollView, FlatList, ImageBackground,Animated,
    Easing
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IoIcon from 'react-native-vector-icons/Ionicons'
import {
    BACKGROUND_COLOR, H1_FONT_SIZE, ON_BACKGROUND_COLOR, ON_SURFACE_COLOR, SURFACE_COLOR,
    PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, PRIMARY_VARIANT_ONE_COLOR, SUBTEXT_FONT_SIZE, TEXT_FONT_REGULAR, H3_FONT_SIZE
} from "../../config/const";

import PropTypes from 'prop-types'
import EmotionButton from "../EmotionButton/EmotionButton";



const propTypes = ({
    style: PropTypes.any,
    data: PropTypes.any,
    onEmotionPress: PropTypes.func,
    onVideoPress: PropTypes.func,
    onSettingPress: PropTypes.func,

});

const defaultProps = {
    style: {},
    data: PropTypes.any,
    onEmotionPress() {
    },
    onVideoPress() {
    }
};
export default class CartoonItem extends Component {
    constructor(props) {
        super(props);
        this.onVideoPress = this.onVideoPress.bind(this);
        this.state={
            scale:new Animated.Value(0)
        }
    }
    componentWillMount(){
        Animated.timing(
            this.state.scale,{
                toValue:1,
                duration:500,
                easing:Easing.ease
            }
        ).start();
    }

    onEmotionPress(data) {
        const {onEmotionPress} = this.props;
        onEmotionPress(data);
    }


    onVideoPress() {
        const {onVideoPress} = this.props;
        onVideoPress();
    }


    render() {
        const {style, data} = this.props;
        console.log("thumnail o day ");
        return (
            <Animated.View style={[styles.container, style,{
                transform:[{scale:this.state.scale}]
            }]}>
                <View style={styles.header}>
                    <Text style={styles.videoName}>{data.youtubeVideoTitle}</Text>

                    <ImageBackground style={styles.videoContainer} source={{uri: data.thumbnailUrl}}>
                        <TouchableOpacity style={styles.blurBackground} onPress={this.onVideoPress}>
                            <Image style={{width:60,height:60}} source={require("../../../src/assets/images/play.png")}/>
                        </TouchableOpacity>
                    </ImageBackground>

                    {/*<View style={styles.footer}>*/}
                        {/*<TouchableOpacity style={styles.actionContainer} onPress={this.onEmotionPress("happy")}>*/}
                            {/*<IoIcon style={styles.actionIcon} name="md-happy" size={H1_FONT_SIZE}*/}
                                    {/*color={ON_SURFACE_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.actionContainer} onPress={this.onEmotionPress("sad")}>*/}
                            {/*<IoIcon style={styles.actionIcon} name="md-sad" size={H1_FONT_SIZE}*/}
                                    {/*color={ON_SURFACE_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.actionContainer} onPress={this.onEmotionPress("meh")}>*/}
                            {/*<FontAwesomeIcon style={styles.actionIcon} name="thumbs-up" size={H1_FONT_SIZE}*/}
                                             {/*color={ON_SURFACE_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.actionContainer} onPress={this.onEmotionPress("heart")}>*/}
                            {/*<FontAwesomeIcon style={styles.actionIcon} name="heart" size={H1_FONT_SIZE}*/}
                                             {/*color={ON_SURFACE_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<EmotionButton>*/}
                            {/*<FontAwesomeIcon style={styles.actionIcon} name="heart" size={H1_FONT_SIZE}*/}
                                             {/*color={ON_SURFACE_COLOR}/>*/}
                        {/*</EmotionButton>*/}
                    {/*</View>*/}
                </View>
            </Animated.View>
        )
    }
}

CartoonItem.defaultProps = defaultProps;
CartoonItem.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white',paddingVertical:'2%'},
    header: {},
    videoName: {
        fontSize: H3_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
        fontWeight: 'bold',
        color: ON_BACKGROUND_COLOR,
        margin:'2%'
    },
    blurBackground: {
        justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100%',
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 2,
    },
    timeText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
    },
    detail: {
        padding: '2%',
        fontSize: PARAGRAPH_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
        color: ON_BACKGROUND_COLOR,
    },

    footer: {
        borderTopWidth: 1,
        borderColor: SURFACE_COLOR,
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionContainer: {flexDirection: 'row', margin: '3%', justifyContent: 'center', alignItems: 'center'},
    actionText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
    },
    actionIcon: {},
    actionMenuButton: {
        marginLeft: 'auto', marginRight: '2%'
    },
});

 
