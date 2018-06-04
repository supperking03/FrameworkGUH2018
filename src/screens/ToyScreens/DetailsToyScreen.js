/*
 * @author: LeVoGiaKhang on 5/26/2018
 */

import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
    BACKGROUND_COLOR,
    H2_FONT_SIZE,
    H3_FONT_SIZE,
    PRIMARY_VARIANT_ONE_COLOR,
    TEXT_FONT_BOLD, TEXT_FONT_BOLD_ITALIC
} from "../../config/const";
import SlidingUpPanel from 'rn-sliding-up-panel'
import globalStore from "../../store/global";
import {BoxShadow} from 'react-native-shadow';

const {width, height} = Dimensions.get("window");
const CARD_WIDTH = width - 16;
const CARD_HEIGHT = 200;

const shadowOpt1 = {
    width: CARD_WIDTH + 6,
    height: CARD_HEIGHT + 6,
    color: "#000",
    border: 1,
    radius: 10,
    opacity: 0.015,
    x: -4,
    y: -3,
};
const shadowOpt2 = {
    width: CARD_WIDTH + 10,
    height: CARD_HEIGHT + 10,
    color: "#000",
    border: 1,
    radius: 10,
    opacity: 0.015,
    x: -5,
    y: -5,

};
const shadowOpt3 = {
    width: CARD_WIDTH + 14,
    height: CARD_HEIGHT + 14,
    color: "#000000",
    border: 1,
    radius: 10,
    opacity: 0.005,
    x: -7,
    y: -7,
    style: {marginVertical: 20, marginLeft: 8}
    };
const shadowOpt4 = {
    width: CARD_WIDTH + 14,
    height: CARD_HEIGHT + 14,
    color: "#000000",
    border: 1,
    radius: 10,
    opacity: 0.005,
    x: -7,
    y: -7,
    style: {marginVertical: 20, marginLeft: 8, marginBottom: 180}
};
export default class DetailsToyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ['https://media.takealot.com/covers/27532265/perplexus_epic-zoom.jpg',
                'https://images.catsolonline.com/cache/PAT_950-500x500.jpg',
                'https://images-na.ssl-images-amazon.com/images/I/811F7GyCHsL._SL1437_.jpg',
                'https://ae01.alicdn.com/kf/HTB1S.VRXhf85uJjSZFDq6z2wXXaG/3D-Magic-Intellect-Maze-Ball-Track-Puzzle-Toy-Perplexus-Epic-Game-Children-Adult-Magnetic-Balls-Toys.jpg_640x640.jpg',
                'https://cdn.shopify.com/s/files/1/1342/5013/products/perplexus_rookie_large.jpg?v=1472088273',
                'https://d1whcn1ntmec99.cloudfront.net/images/catalog/products/games/perplexus_death_star/full1.jpg'],
            slidingUpVisible: false,
            currentImageIndex: 0,
        };

        globalStore.register('detailsToyScreen', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    componentWillMount() {
        this.setState({data: this.props.navigation.state.params.imageUrls});

    }

    renderEmpty = () => {
        return null;
    };


    renderHeader = () => {
        return null;
    };

    renderFooter = () => {
        return null;
    };

    _handleZoomIn = (index) => {
        this.setState({slidingUpVisible: true, currentImageIndex: index});
    };

    render() {
        return (
            <View
                style={styles.container}>

                <View
                    style={styles.header}
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
                        style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 35,
                                fontFamily: TEXT_FONT_BOLD_ITALIC,
                                marginLeft: -18
                            }}>
                            Chi Tiết
                        </Text>
                    </View>
                </View>

                <View
                    style={styles.body}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item, index}) => (

                            index !== this.state.data.length - 1 ?
                                (
                                    <BoxShadow
                                        setting={shadowOpt3}>
                                        <BoxShadow
                                            setting={shadowOpt2}>
                                            <BoxShadow
                                                setting={shadowOpt1}>
                                                <View
                                                    style={styles.contentView}>
                                                    <TouchableOpacity
                                                        onPress={() => this._handleZoomIn(`${index}`)}
                                                        style={styles.contentTouchableOpacity}>
                                                        <Image
                                                            style={{
                                                                flex: 1,
                                                                resizeMode: "stretch",
                                                            }}
                                                            source={{uri: `${item}`}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </BoxShadow>
                                        </BoxShadow>
                                    </BoxShadow>
                                )
                                :
                                (
                                    <BoxShadow
                                        setting={shadowOpt4}>
                                        <BoxShadow
                                            setting={shadowOpt2}>
                                            <BoxShadow
                                                setting={shadowOpt1}>
                                                <View
                                                    style={[styles.contentView, {marginBottom: 160}]}>
                                                    <TouchableOpacity
                                                        onPress={() => this._handleZoomIn(`${index}`)}
                                                        style={styles.contentTouchableOpacity}>
                                                        <Image
                                                            style={{
                                                                flex: 1,
                                                                resizeMode: "stretch"
                                                            }}
                                                            source={{uri: `${item}`}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </BoxShadow>
                                        </BoxShadow>
                                    </BoxShadow>
                                )

                        )
                        }
                        numColumns={1}
                        keyExtractor={(item) => item}
                        ListEmptyComponent={this.renderEmpty}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}/>
                </View>

                <View
                    style={styles.emotionView}>
                    <TouchableOpacity
                        style={styles.btnEmotion}>
                        <MaterialCommunityIcons
                            name={"heart"}
                            color={"#fd798d"}
                            size={80}>
                        </MaterialCommunityIcons>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnEmotion}>
                        <MaterialCommunityIcons
                            name={"heart-off"}
                            color={"#fd798d"}
                            size={80}>
                        </MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>

                <SlidingUpPanel
                    visible={this.state.slidingUpVisible}
                    allowDragging={false}
                    height={Dimensions.get('window').height}
                    onRequestClose={() => {
                        this.setState({visible: false})
                    }}>

                    <View
                        style={{flex: 1}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({slidingUpVisible: false})
                            }}
                            style={{flex: 1, justifyContent: "center"}}>
                            <Image
                                style={{width: width, aspectRatio: 1}}
                                source={{uri: `${this.state.data[this.state.currentImageIndex]}`}}
                            />
                        </TouchableOpacity>
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}


const HEADER_HEIGHT = height / 10;
const BODY_HEIGHT = height * 9 / 10;

const styles = StyleSheet.create({
    container:
        {
            position: "absolute",
            height: height,
            width: width,
            backgroundColor: "red"
        },
    header:
        {
            height: HEADER_HEIGHT,
            flexDirection: "row",
            paddingLeft: 0,
            backgroundColor: "white",
            borderWidth: 2,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "white",
        },
    headerButton:
        {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        },
    headerText:
        {
            marginTop: -2,
            fontSize: H2_FONT_SIZE,
            fontFamily: TEXT_FONT_BOLD,
            color: "black",
        },
    body:
        {
            height: BODY_HEIGHT,
            backgroundColor: "white",
        },
    contentView:
        {
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: 'white',
            flexDirection: "row",
            borderRadius: 10,
        },
    contentTouchableOpacity:
        {
            flex: 1,
            borderRadius: 10,
            //backgroundColor: "yellow"
        },
    contentImage:
        {
            borderRadius: 10,
            resizeMode: "center",
        },
    emotionView:
        {
            marginTop: -140,
            backgroundColor: "#1e90ff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 70,
            height: 100,
            marginHorizontal: 30,
        },
    btnEmotion:
        {
            width: 80,
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: "white",
        },
});