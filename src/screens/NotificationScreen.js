import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    H1_FONT_SIZE,
    H2_FONT_SIZE,
    ON_BACKGROUND_COLOR,
    PRIMARY_COLOR,
    SUBHEADING_FONT_SIZE,
    SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_BOLD,
    TEXT_FONT_MEDIUM
} from "../config/const";
import NewPostItem from "../components/NotificationItems/NewPostItem";
import NewCommentItem from "../components/NotificationItems/NewCommentItem";
import NewReactionItem from "../components/NotificationItems/NewReactionItem";
import NewFriendRequestItem from "../components/NotificationItems/NewFriendRequestItem";
import NewAcceptFriendRequest from "../components/NotificationItems/NewAcceptFriendRequest";
import PushNotification from 'react-native-push-notification';

export default class NotificationScreen extends Component {

    constructor() {
        super();
        this.state =
            {
                componentsArray: [],
                disableButton: false,
            };


    };

    handleOnPressSelect = (id, avatarUri, ownerActivityName, type, postName, valid) => {
        PushNotification.localNotification({
            id: id,
            title: "this is Title",
            message: "this is message",
            ticker: "My Notification Ticker",
            largeIcon: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/c0.0.395.395/25550291_1486226041476591_2877127214632233679_n.jpg?_nc_cat=0&_nc_eui2=AeHhur-4A1h4F6B6vxvkoUhX51sOhrxz4T2dgaK-dqT7og4uJYmJEcJWm5D8qtKcFttipAvJ9WSkohy4o_M9QOoNErZa7PT9xIa199OX0pT4kg&oh=40ad8ab5d59aba58943545dbb9dd6dff&oe=5B8CB7AD',
            smallIcon: "",
            bigText: "My big text that will be shown when notification is expanded",
            subText: "This is a subText",
            color: "red",
            tag: 'some_tag',
            group: "group",
            vibrate: true,
            vibration: 300,
            avatarUri: avatarUri,
            ownerActivityName: ownerActivityName,
            type: type,
            postName: postName,
            valid: valid,
            mileStone: {
                date: "today",
                hours: 24,
                minutes: 1,
            }

        });
        alert("successed");
    };

    _addMoreComponent(notification) {
        this.setState({
                disableButton: true,
                componentsArray: [...this.state.componentsArray, notification]
            },
            () => {
                this.setState({disableButton: false})
            });
    };

    _getUnrealType = (number) => {
        if (number === 1) {
            return "post";
        }
        else {
            return "comment";
        }
    };

    _updateStatusOfNotifications = () => {

    };

    render() {

        let renderComponents = this.state.componentsArray.map((index, key) => {
            const {avatarUri, ownerActivityName, type, postName, mileStone, valid} = this.state.componentsArray[key];

            if (type === "post" && valid === true) {
                return (
                    <NewPostItem
                        key={key}
                        imageAvatar={avatarUri}
                        ownerActivityName={ownerActivityName}
                        postName={postName}
                        mileStone={mileStone}/>
                );
            }
            else if (type === "comment" && valid === true) {
                return (

                    <NewCommentItem
                        key={key}
                        imageAvatar={avatarUri}
                        ownerActivityName={ownerActivityName}
                        mileStone={mileStone}/>
                );
            }
            else if (type === "friend-request" && valid === true) {
                return (

                    <NewFriendRequestItem
                        key={key}
                        imageAvatar={avatarUri}
                        ownerActivityName={ownerActivityName}
                        mileStone={mileStone}/>
                );
            }
            else if (type === "accept-friend" && valid === true) {
                return (
                    <NewAcceptFriendRequest
                        key={key}
                        imageAvatar={avatarUri}
                        ownerActivityName={ownerActivityName}
                        mileStone={mileStone}/>
                );
            }
            else if (type === "reaction" && valid === true) {
                return (
                    <NewReactionItem
                        key={key}
                        imageAvatar={avatarUri}
                        ownerActivityName={ownerActivityName}
                        nameOfActivityBeReacted={"liked"}
                        mileStone={mileStone}
                        onPressDelete={() => alert("aaa")}/>
                );
            }
        });

        return (
            <View
                style={styles.cover}>
                <View
                    style={styles.header}>
                    <TouchableOpacity
                        style={styles.selectView}
                        //disabled={this.state.disableButton}
                        onPress={
                            () => {
                                //this.handleOnPressSelect(Math.floor(Math.random() * 2) + 1, this._getUnrealType(Math.floor(Math.random() * 2) + 1))
                                // this._addMoreComponent({
                                //     avatarUri: {uri: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t31.0-8/26233710_1703719779690152_7535994510174998296_o.jpg?_nc_cat=0&oh=75152ef90c701d75b1d900d7d571dbac&oe=5B9714C3"},
                                //     ownerActivityName: "Dang Xuan Duy Khuong",
                                //     type: "reaction",
                                //     postName: "cak",
                                //     mileStone: {
                                //         date: "yesterday",
                                //         hours: 33,
                                //         minutes: 0,
                                //     },
                                //     valid: true,
                                // })
                                this.handleOnPressSelect(
                                    1,
                                    {uri: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t31.0-8/26233710_1703719779690152_7535994510174998296_o.jpg?_nc_cat=0&oh=75152ef90c701d75b1d900d7d571dbac&oe=5B9714C3"},
                                    "Khanggie",
                                    "accept-friend",
                                    "cac cac",)
                            }
                        }>
                        <Text
                            style={styles.textSelect}>
                            Select
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={styles.notificationView}>
                        <Text
                            style={styles.textNotifications}>
                            Notifications
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}>

                    <View>
                        <Text
                            style={styles.textGroup}>
                            New notification
                        </Text>
                        {renderComponents}
                    </View>

                    <View>
                        <Text
                            style={styles.textGroup}>
                            Viewed
                        </Text>
                        {renderComponents}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const PADDING_LEFT = 10;
const styles = StyleSheet.create({
    cover:
        {
            flex: 1,
        },
    selectView:
        {
            flex: 1.2,
            paddingLeft: 10,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 10,
        },
    textSelect:
        {
            fontSize: SUBHEADING_FONT_SIZE,
            fontFamily: TEXT_FONT_MEDIUM,
            color: PRIMARY_COLOR,
        },
    notificationView:
        {
            flex: 1,
            paddingLeft: PADDING_LEFT,
            paddingBottom: 10,
        },
    textNotifications:
        {
            fontSize: H1_FONT_SIZE + 6,
            fontFamily: TEXT_FONT_BOLD,
            color: ON_BACKGROUND_COLOR,
        },
    header:
        {
            flex: 0.17,
            borderWidth: 1,
            borderColor: SURFACE_COLOR,
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
        },
    content:
        {
            flex: 5,
        },
    textGroup:
        {
            fontSize: H2_FONT_SIZE,
            fontFamily: TEXT_FONT_BOLD,
            paddingLeft: PADDING_LEFT,
            marginTop: 10,
            color: ON_BACKGROUND_COLOR,
        },
});


