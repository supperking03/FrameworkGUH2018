/*
 * @author: LeVoGiaKhang on 5/26/2018
 */

import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from "react-native";
import ToyCard from "../../components/ToyComponents/ToyCard";
import Icon from "react-native-vector-icons/Entypo";
import {
    H2_FONT_SIZE,
    ON_SURFACE_COLOR,
    SURFACE_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_BOLD_ITALIC,
    TEXT_FONT_MEDIUM_ITALIC
} from "../../config/const";
import globalStore from "../../store/global";
import {BoxShadow} from 'react-native-shadow';

const {width, height} = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;
const CARD_HEIGHT = height / 2.5;

const shadowOpt1 = {
    width: CARD_WIDTH + 4,
    height: CARD_HEIGHT + 8,
    color: "#000",
    border: 1,
    radius: 10,
    opacity: 0.015,
    x: 3,
    y: 2,
};

const shadowOpt2 = {
    width: CARD_WIDTH + 12,
    height: CARD_HEIGHT + 14,
    color: "#000",
    border: 1,
    radius: 10,
    opacity: 0.005,
    x: -1,
    y: -2,
};

const shadowOpt3 = {
    width: CARD_WIDTH + 16,
    height: CARD_HEIGHT + 16,
    color: "#000",
    border: 1,
    radius: 10,
    opacity: 0.015,
    x: -3,
    y: -3,
    style: {marginTop: 20, marginHorizontal: 2}
};


export default class ToysFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                data: [
                    {
                        toys: '',
                    }
                ]
            };

        globalStore.register('toyScreen', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    componentWillMount() {
        this._receiveData();
    };

    _receiveData = () => {
        fetch('http://150.95.110.222:23300/api/v2/users/1/kids/1/toys',
            {
                method: "GET",
                headers:
                    {
                        'Authorization': 'Bearer ' + "a",
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
                        //console.log(data.toys);
                        this.setState({
                            data: data.toys,
                        })
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
    };

    renderEmpty = () => {
        return null;
    };


    renderHeader = () => {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    height: 70,
                    alignItems: "center",
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    marginBottom: 5,
                    borderColor: "white",
                    flexDirection: "row",
                }}
            elevation={3}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                    <Icon
                        name={"chevron-left"}
                        size={35}
                        color={"black"}
                    />
                </TouchableOpacity>
                <View
                    style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text
                        style={{
                            color: "black",
                            fontSize: 35,
                            fontFamily: TEXT_FONT_BOLD_ITALIC,
                            marginLeft: -30
                        }}>
                        Đồ Chơi
                    </Text>
                </View>
            </View>
        );
    };

    renderFooter = () => {
        return null;
    };

    render() {
        return (

            <View
                style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item, index}) =>
                        (
                            <BoxShadow
                                setting={shadowOpt3}>
                                <BoxShadow
                                    setting={shadowOpt2}>
                                    <BoxShadow
                                        setting={shadowOpt1}>
                                        <View
                                            style={styles.cards}>
                                            <ToyCard
                                                onPress={() => {
                                                    this.props.navigation.navigate("detailsToyScreen", {imageUrls: item.imageUrls})
                                                }}
                                                item={item}/>
                                        </View>
                                    </BoxShadow>
                                </BoxShadow>
                            </BoxShadow>
                        )}
                    numColumns={2}
                    keyExtractor={item => item.nameOfToy}
                    ListEmptyComponent={this.renderEmpty}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={50}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            backgroundColor: "white",
        },
    cards:
        {
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            marginVertical: 5,
            marginHorizontal: 5,
            backgroundColor: "white",
            borderRadius: 10,
        },
    headerButton:
        {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },

});