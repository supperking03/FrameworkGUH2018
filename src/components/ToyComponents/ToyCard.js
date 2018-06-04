/*
 * @author: LeVoGiaKhang on 5/26/2018
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';
import {H1_FONT_SIZE, H3_FONT_SIZE, ON_BACKGROUND_COLOR, TEXT_FONT_HEAVY} from "../../config/const";

export default class ToyCard extends Component {
    render() {
        const {
            item,
            onPress,
        } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.container}>
                <View
                    style={styles.imageView}>
                    <Image
                        style={styles.imageToy}
                        source={{uri: `${item.featureImageUrl}`}}/>
                </View>

                <View
                    style={styles.infoView}>
                    <View
                        style={styles.nameView}>
                        <Text
                            style={styles.textNameOfToy}
                            numberOfLines={3}>
                            {item.name}
                        </Text>
                    </View>

                    {/*<View*/}
                        {/*style={styles.moreView}>*/}

                    {/*</View>*/}
                </View>
            </TouchableOpacity>
        );
    }
}
function nope()
{}

ToyCard.propTypes = {
    item: PropTypes.any,
    onPress: PropTypes.any,
};

ToyCard.defaultProps = {
    onPress: nope,
};

const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            borderRadius: 10,
        },
    imageView:
        {
            flex: 3,
            flexDirection: "row",
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 5,
        },
    imageToy:
        {
            flex: 1,
            resizeMode: "stretch",
            borderRadius: 10,
        },
    infoView:
        {
            flex: 1
        },
    nameView:
        {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
        },
    textNameOfToy:
        {
            fontSize: 16,
            fontFamily: TEXT_FONT_HEAVY,
            color: ON_BACKGROUND_COLOR
        },
    moreView:
        {
            flex: 2,
            flexDirection: "row",
        }

});