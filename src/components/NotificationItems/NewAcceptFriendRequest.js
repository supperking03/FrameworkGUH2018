import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types';
import {
    COVER_ICON_VIEW_WIDTH,
    MARGIN_BOTTOM_COVER_VIEW, MARGIN_LEFT_BETWEEN_AVATAR_AND_CONTENT, MARGIN_TOP_CONTENT_VIEW, MARGIN_TOP_COVER_VIEW,
    MARGIN_TOP_MILESTONE, SWIPE_START_MIN_DISTANCE
} from "./const";
import {
    BACKGROUND_COLOR, ON_BACKGROUND_COLOR,
    PRIMARY_COLOR,
    PRIMARY_VARIANT_ONE_COLOR,
    SUBTEXT_FONT_SIZE, SURFACE_COLOR, TEXT_FONT_BOLD, TEXT_FONT_HEAVY, TEXT_FONT_LIGHT,
    TEXT_FONT_MEDIUM
} from "../../config/const";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Swipeable from "./Swipeable";

export default class NewAcceptFriendRequest extends Component {

    onPressMessage = () => {
        alert("Cak cak douma");
    };

    render() {

        const {
            marginLeft,
            marginRight,
            imageAvatar,
            ownerActivityName,
            mileStone,
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
                        disabled={true}>
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
                                        style={styles.icon}
                                        name="check"
                                        size={10}
                                        color="#FFFFFF"/>
                                </View>
                            </View>
                        </View>


                        <View
                            style={styles.activityView}>
                            <Text
                                style={styles.content}
                                numberOfLines={3}>
                                <Text
                                    style={styles.textOwnerActivityName}>
                                    {ownerActivityName}
                                </Text>
                                <Text
                                    style={styles.textActivity}>
                                    {' accepted your friend request'}
                                </Text>
                            </Text>

                            {mileStone.minutes < 10 ?
                                (<Text
                                    style={styles.textMileStone}>
                                    {mileStone.date + " at " + mileStone.hours + ":0" + mileStone.minutes}
                                </Text>)
                                :
                                (<Text
                                    style={styles.textMileStone}>
                                    {mileStone.date + " at " + mileStone.hours + ":" + mileStone.minutes}
                                </Text>)
                            }

                            <View
                                style={styles.tOView}>
                                <PrimaryButton
                                    text={"Message"}
                                    width={100}
                                    height={30}
                                    color={PRIMARY_COLOR}
                                    textColor={BACKGROUND_COLOR}
                                    fontFamily={TEXT_FONT_HEAVY}
                                    fontSize={SUBTEXT_FONT_SIZE}
                                    style={{borderRadius: 20}}
                                    onPress={this.onPressMessage.bind(this)}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        );
    }
}

function nope() {
}

NewAcceptFriendRequest.propTypes = {
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    imageAvatar: PropTypes.any.isRequired,
    ownerActivityName: PropTypes.string.isRequired,
    mileStone: PropTypes.shape({
        date: PropTypes.string.isRequired,
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
    }),
    onPressDelete: PropTypes.func,
};

NewAcceptFriendRequest.defaultProps = ({
    marginLeft: 10,
    marginRight: 10,
    imageAvatar: {uri: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/30740548_1243311172466624_1153362417359519744_n.jpg?_nc_cat=0&oh=26ecb85d306f7b8527e39d3761ef1a59&oe=5B7C2BEE'},
    ownerActivityName: 'LeVoGiaKhangggggggggggggggggggggggggggg',
    mileStone: {
        date: new Date().getDate() + new Date().getMonth(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    },
    onPressDelete: PropTypes.func,
});

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
            backgroundColor: "#f0932b",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
        },
    icon:
        {
            marginLeft: 2,
            marginTop: 0,
        },
    activityView:
        {
            backgroundColor: "transparent",
            flex: 5,
            paddingLeft: MARGIN_LEFT_BETWEEN_AVATAR_AND_CONTENT,
        },
    content:
        {
            marginTop: MARGIN_TOP_CONTENT_VIEW,
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
    textMileStone:
        {
            marginTop: MARGIN_TOP_MILESTONE,
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_LIGHT,
        },
    tOView:
        {
            flexDirection: "row",
            marginTop: 7,
        }
});