import React, {Component} from 'react';
import {
    View,
    Animated,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {ON_BACKGROUND_COLOR, SUBTEXT_FONT_SIZE, TEXT_FONT_MEDIUM} from "../../config/const";


const ANIMATION_DURATION = 300;

export default class UserAvatarItem extends Component {

    constructor() {
        super();
        this.state =
            {
                animated: new Animated.Value(0),
            }
    }

    componentWillMount()
    {
        Animated.timing(this.state.animated,
            {
                toValue: 1,
                duration: 1000,
            }).start();
    };

    render() {

        const {item} = this.props;

        return (
            <Animated.View
        style={[styles.avatarCover,
        {
            transform:
                [
                    {
                        scale: this.state.animated.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.01, 1],
                        })
                    }
                ]
        }]}>
    <View
        style={styles.avatarView}>
    <TouchableOpacity
        style={styles.tOAvatar}>
    <Image
        style={styles.avatar}
        source={{uri: `${item.avatar}`}}/>
        </TouchableOpacity>
        {
            item.status === "busy"
                ?
                (<View
                style={styles.imageStatusCover}>
        <Image
            style={styles.imageStatus}
            source={require('../../assets/images/busy-status-circle.png')}>
        </Image>
        </View>)
        :
            (<View
            style={styles.imageStatusCover}>
        <Image
            style={styles.imageStatus}
            source={require('../../assets/images/online-status-circle.png')}>
        </Image>
        </View>)
        }
    </View>
        <View
        style={styles.infoView}>
    <Text
        style={styles.textName}>
        {item.name},
    </Text>

        <Text
        style={styles.textAge}>
        {item.age}
    </Text>
        </View>
        </Animated.View>
    );
    }
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    avatarCover:
        {
            width: width / 3 - 15,
            height: 110,
            marginVertical: 0,
        },
    avatarView:
        {
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
        },
    tOAvatar:
        {
            width: 80,
            aspectRatio: 1,
            borderRadius: 40,
        },
    avatar:
        {
            width: 80,
            aspectRatio: 1,
            resizeMode: "cover",
            borderRadius: 40,
        },
    imageStatusCover:
        {
            marginTop: -6,
            width: 13,
            height: 13,
            paddingVertical: 4,
            paddingHorizontal: 4,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,
        },
    imageStatus:
        {
            width: 9,
            height: 9,
            resizeMode: "center",
        },
    infoView:
        {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        },
    textName:
        {
            color: ON_BACKGROUND_COLOR,
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_MEDIUM,
        },
    textAge:
        {
            marginLeft: 3,
            fontFamily: TEXT_FONT_MEDIUM,
            color: ON_BACKGROUND_COLOR,
        },
});

