import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    COVER_ICON_VIEW_WIDTH, MARGIN_BOTTOM_COVER_VIEW, MARGIN_LEFT_BETWEEN_AVATAR_AND_CONTENT, MARGIN_TOP_CONTENT_VIEW,
    MARGIN_TOP_COVER_VIEW,
    MARGIN_TOP_MILESTONE, SWIPE_START_MIN_DISTANCE
} from "./const";
import {
    ON_BACKGROUND_COLOR,
    PRIMARY_VARIANT_ONE_COLOR, SUBTEXT_FONT_SIZE, SURFACE_COLOR, TEXT_FONT_BOLD, TEXT_FONT_HEAVY,
    TEXT_FONT_LIGHT, TEXT_FONT_MEDIUM
} from "../../config/const";
import Swipeable from "./Swipeable";

export default class NewCommentItem extends Component {

    handleOnPress = () => {
        alert("A New Comment!");
    };


    render() {
        const {
            marginLeft,
            marginRight,
            imageAvatar,
            ownerActivityName,
            type,
            mileStone,
            onPressMainView,
            onPressDelete,
        } = this.props;

        const rightButtons = [
            <TouchableOpacity
                style={{
                    width: SWIPE_START_MIN_DISTANCE,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red"
                }}
                onPress={onPressDelete}>
                <Text
                    style={{color: "white"}}>
                    Delete
                </Text>
            </TouchableOpacity>,
        ];

        return (
            <Swipeable
                swipeStartMinDistance={SWIPE_START_MIN_DISTANCE}
                rightButtons={rightButtons}>
                <View
                    style={styles.cover}>
                    <TouchableOpacity
                        style={[styles.touchable, {marginLeft, marginRight}]}
                        onPress={onPressMainView}>
                        <View
                            style={styles.imageView}>
                            <Image
                                style={styles.imageAvatar}
                                source={imageAvatar}/>


                            <View
                                style={styles.coverIconView}>
                                <View
                                    style={styles.backgroundIconView}>
                                    <Icon
                                        name="message"
                                        size={10}
                                        color="#FFFFFF"/>
                                </View>
                            </View>
                        </View>

                        <View
                            style={styles.activityView}>
                            <View
                                style={styles.titleActivityView}>
                                <View
                                    style={styles.titleView}>
                                    <Text
                                        numberOfLines={3}>
                                        <Text
                                            style={styles.textOwnerActivityName}>
                                            {ownerActivityName}
                                        </Text>
                                        <Text
                                            style={styles.textActivity}>
                                            {" " + 'comment your post'}
                                        </Text>
                                    </Text>
                                </View>

                                <View
                                    style={styles.imageActivityView}>
                                    <Image
                                        style={styles.imageActivity}
                                        source={imageAvatar}/>
                                </View>
                            </View>

                            <View
                                style={styles.contentView}>
                                <Text
                                    style={styles.textContent}
                                    numberOfLines={2}>
                                    Learn how to improve your playing quality and even overall understanding of online
                                    blah
                                    blah blah
                                </Text>
                            </View>

                            {mileStone.minutes < 10 ?
                                (<Text
                                    style={styles.textMileStone}
                                    numberOfLines={1}>
                                    {mileStone.date + " at " + mileStone.hours + ":0" + mileStone.minutes}
                                </Text>)
                                :
                                (<Text
                                    style={styles.textMileStone}
                                    numberOfLines={1}>
                                    {mileStone.date + " at " + mileStone.hours + ":" + mileStone.minutes}
                                </Text>)
                            }
                        </View>
                    </TouchableOpacity>

                </View>
            </Swipeable>
        );
    }
}

function nope() {

}

NewCommentItem.propTypes = {
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    imageAvatar: PropTypes.any.isRequired,
    ownerActivityName: PropTypes.string.isRequired,
    type: PropTypes.string,
    mileStone: PropTypes.shape({
        date: PropTypes.string.isRequired,
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
    }),
    onPressMainView: PropTypes.func,
    onPressDelete: PropTypes.func,
};

NewCommentItem.defaultProps = {
    marginLeft: 10,
    marginRight: 10,
    imageAvatar: {uri: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/30740548_1243311172466624_1153362417359519744_n.jpg?_nc_cat=0&oh=26ecb85d306f7b8527e39d3761ef1a59&oe=5B7C2BEE'},
    ownerActivityName: 'LeVoGiaKhangggggggggggggggggggggggggggg',
    type: 'own',
    mileStone: {
        date: new Date().getDate() + new Date().getMonth(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    },
    onPressMainView: nope,
    onPressDelete: nope,
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    cover:
        {
            width: "100%",
            paddingVertical: 3,
            borderColor: SURFACE_COLOR,
            borderWidth: 1,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
        },
    touchable:
        {
            flex: 1,
            marginTop: MARGIN_TOP_COVER_VIEW,
            marginBottom: MARGIN_BOTTOM_COVER_VIEW,
            flexDirection: "row",
        },
    imageView:
        {
            flex: 1,
            aspectRatio: 1,
        },
    imageAvatar:
        {
            width: "100%",
            resizeMode: "cover",
            aspectRatio: 1,
            borderRadius: 50,
        },
    coverIconView:
        {
            marginTop: -COVER_ICON_VIEW_WIDTH,
            marginLeft: 35,
            width: COVER_ICON_VIEW_WIDTH,
            aspectRatio: 1,
            backgroundColor: "white",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
        },
    backgroundIconView:
        {
            width: COVER_ICON_VIEW_WIDTH - 3,
            aspectRatio: 1,
            backgroundColor: "#00cec9",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
        },
    activityView:
        {
            flex: 5,
            paddingLeft: MARGIN_LEFT_BETWEEN_AVATAR_AND_CONTENT,
        },
    titleActivityView:
        {
            flexDirection: "row",
        },
    titleView:
        {
            flex: 4,
            justifyContent: "center",
        },
    textOwnerActivityName:
        {
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_BOLD,
            color: ON_BACKGROUND_COLOR,
        },
    textActivity:
        {
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_MEDIUM,
        },
    imageActivityView:
        {
            flex: 1,
        },
    imageActivity:
        {
            borderRadius: 7,
            resizeMode: "cover",
            width: "100%",
            aspectRatio: 1,
        },
    contentView:
        {
            borderWidth: 2,
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderColor: "gray",
            paddingLeft: MARGIN_LEFT_BETWEEN_AVATAR_AND_CONTENT,
        },
    textContent:
        {
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_LIGHT,
        },
    textMileStone:
        {
            marginTop: MARGIN_TOP_MILESTONE,
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_LIGHT,
            color: PRIMARY_VARIANT_ONE_COLOR,
        }
});

