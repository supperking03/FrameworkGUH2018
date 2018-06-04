/*
 * @author: LeVoGiaKhang on 5/24/2018
 */

import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

const myConfigure = () => {
    PushNotification.configure(
        {
            /**
             * (required) Called when a remote or local notification is opened or received
             */
            onNotification:
                function (notification) {
                    if (notification.type === "post") {
                        alert("post")
                    }
                    else if (notification.type === "comment") {
                        alert("comment")
                    }
                    else if (notification.type === "accept-friend") {
                        alert("accept-friend")
                    }
                    else if (notification.type === "friend-request") {
                        alert("friend-request")
                    }
                    else if (notification.type === "reaction") {
                        alert("reaction")
                    }
                },

            // onRemoteFetch: function () {
            // },

            /**
             * (optional) Called when Token is generated (iOS and Android)
             */
            // onRegister: function () {
            // },

            /**
             * ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
             */
            //senderID: "770706117112",

            /**
             * IOS ONLY (optional): default: all - Permissions to register.
             */
            // permissions: {
            //     alert: true,
            //     badge: true,
            //     sound: true
            // },

            /** Should the initial notification be popped automatically
             * default: true
             */
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,

        }
    )
};


export {
    myConfigure,
};