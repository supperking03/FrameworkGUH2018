import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {List} from "react-native-elements";
import {
    H1_FONT_SIZE, ON_BACKGROUND_COLOR, SUBTEXT_FONT_SIZE, TEXT_FONT_BOLD,
    TEXT_FONT_LIGHT, TEXT_FONT_MEDIUM
} from "../config/const";
import UserAvatarItem from "../components/UserAvatarItem/UserAvatarItem";
import SlidingUpPanel from 'rn-sliding-up-panel'
import FilterContent from "../components/SlidingUpContent/FilterContent";


export default class NearbyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/30740548_1243311172466624_1153362417359519744_n.jpg?_nc_cat=0&oh=26ecb85d306f7b8527e39d3761ef1a59&oe=5B7C2BEE",
                    name: "Kien",
                    age: "19",
                    status: "online",
                },
                {
                    avatar: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/31404108_654701314873547_3563287284612595712_n.jpg?_nc_cat=0&oh=11108a4588e53fd13e545d6731272259&oe=5B89AC11",
                    name: "Phuc",
                    age: "20",
                    status: "busy",
                },
                {
                    //avatar: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/c0.0.395.395/25550291_1486226041476591_2877127214632233679_n.jpg?_nc_cat=0&oh=fcd022e7226e1bd0c6255a0198c4bb94&oe=5B8CB7AD",
                    avatar: "http://windypress.com/files/wallpapers/the_fox_and_the_moon/the_fox_and_the_moon_240x240.jpg",
                    name: "Phong",
                    age: "17",
                    status: "busy",
                },
                {
                    avatar: "https://scontent.fsgn1-1.fna.fbcdn.net/v/t31.0-1/c282.0.960.960/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=0&oh=2a144433c8b08ab90e7e5bd05783efe9&oe=5B784612",
                    name: "Nam",
                    age: "30",
                    status: "offline",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                }, {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
                {
                    avatar: 'https://78.media.tumblr.com/49d7a9c2739eecf1c8bd158d3819dc3d/tumblr_osftj8mJWN1unisz9o7_250.png',
                    name: "Khang",
                    age: "18",
                    status: "busy",
                },
            ],
            refreshing: false,
            visible: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.renderFooter();
        this.setState({refreshing: false})
    };

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {},
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderEmpty = () => {
        return (
            <View
                style={styles.emptyCover}>
                <Text
                    style={styles.emptyText}>
                    No one ...
                </Text>
            </View>
        )
    };


    renderHeader = () => {
        return (
            <View
                style={styles.headerCover}>
                <View
                    style={styles.header}>
                    <View style={styles.iconMenuView}>
                        <TouchableOpacity
                            style={styles.tOIconMenu}>
                            <Image
                                style={styles.iconMenu}
                                source={require('../assets/images/menu-three-horizontal-lines.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={styles.textHeaderView}>
                        <Text
                            style={styles.textHeader}>
                            Nearby
                        </Text>
                    </View>

                    <View style={styles.iconMenuFilter}>
                        <TouchableOpacity
                            style={styles.tOIconFilter}
                            onPress={() => {
                                this.setState({visible: true})
                            }}>
                            <Image
                                style={styles.iconFilter}
                                source={require('../assets/images/filter.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    renderFooter = () => {
        if (!this.state.loading)
            return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    render() {
        return (
            <View
                style={styles.listView}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item, index}) => (
                        (index % 3) === 1 ?
                            (
                                <View
                                    style={[styles.avatarCover, {marginTop: ITEM_HEIGHT / 2}]}>
                                    <UserAvatarItem
                                        item={item}/>
                                </View>
                            )
                            :
                            (
                                <UserAvatarItem
                                    item={item}/>
                            )
                    )
                    }
                    numColumns={3}
                    keyExtractor={item => item.name}
                    ListEmptyComponent={this.renderEmpty}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    //columnWrapperStyle={{backgroundColor: "red"}}

                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}

                />
                <SlidingUpPanel
                    visible={this.state.visible}
                    allowDragging={false}
                    height={Dimensions.get('window').height * 0.65}
                    draggableRange={{top: Dimensions.get('window').height * 0.65 + 20, bottom: 0}}
                    onRequestClose={() => {
                        this.setState({visible: false})
                    }}>
                    <FilterContent/>
                </SlidingUpPanel>
            </View>
        );
    }
}

const ITEM_HEIGHT = 100;
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    listView:
        {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginTop: 0,
            paddingHorizontal: 10,
        },
    headerCover:
        {
            height: 50,
        },
    header:
        {
            flex: 1.5,
            flexDirection: "row",
        },
    iconMenuView:
        {
            flex: 1,
            paddingVertical: 15,
        },
    tOIconMenu:
        {
            flex: 1,
        },
    iconMenu:
        {
            resizeMode: "stretch",
            width: "100%",
            height: "100%",
        },
    textHeaderView:
        {
            flex: 12,
            justifyContent: "center",
            alignItems: "center",
        },
    textHeader:
        {
            fontSize: H1_FONT_SIZE,
            fontFamily: TEXT_FONT_BOLD,
            color: ON_BACKGROUND_COLOR,
        },
    iconMenuFilter:
        {
            flex: 1,
            paddingVertical: 15,
        },
    tOIconFilter:
        {
            flex: 1,
        },
    iconFilter:
        {
            resizeMode: "stretch",
            width: "100%",
            height: "100%",
        },
    container:
        {
            flex: 20,
            backgroundColor: "black",
        },
    emptyCover:
        {
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center"
        },
    emptyText:
        {
            fontSize: SUBTEXT_FONT_SIZE,
            fontFamily: TEXT_FONT_LIGHT,
            color: ON_BACKGROUND_COLOR,
        },
});