import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    ListView,
    TextInput,
    ScrollView,
} from 'react-native'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {
    BACKGROUND_COLOR,
    H1_FONT_SIZE,
    ON_BACKGROUND_COLOR,
    ON_SURFACE_COLOR,
    PARAGRAPH_FONT_SIZE,
    PRIMARY_COLOR,
    SUBTEXT_FONT_SIZE,
    SURFACE_COLOR,
    TEXT_FONT_REGULAR
} from "../config/const";


const exampleData = {
    moments: [
        {
            image: "data:image/jpeg;base64,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",
            name: "Johny",
            seen: false
        },
        {
            image: "data:image/jpeg;base64,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",
            name: "Cher",
            seen: true
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWfkA6fPozy8qlbL8q282B2jWo10s-UK2bYFLv1b_v32r5TAF",
            name: "Peter",
            seen: false
        },

    ],
    posts: [
        {
            id: '001',
            name: "Le Hoang Nam",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uAfoapDbR_ycxF4hltMedCYIqj9bcOZB-ZuD8Sf89rdrGtTv",
            time: '1 day ago',
            status: "Living today's metropolitan",
            image: 'https://i.pinimg.com/564x/7b/3d/ff/7b3dff3be528895764f5da6709b6c90c.jpg',
            like: [{name: "John"}, {name: "May"}, {name: "Wed"}],
            share: [{name: "John"}, {name: "May"}, {name: "Wed"}],
            comments: [{name: "John", comment: 'haha'}, {name: "May", comment: "hehe"}, {name: "Wed", comment: "hihi"}]
        },
        {
            id: '002',
            name: "Johny",
            avatar: "data:image/jpeg;base64,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",
            time: '28 February',
            status: "Win Game UIT Hackathon",
            image: "https://i.pinimg.com/564x/68/99/8c/68998c75f72724bbf292a9eaf20e10a6.jpg",
            like: [{name: "John"}, {name: "May"}, {name: "Wed"}],
            share: [{name: "John"}, {name: "May"}, {name: "Wed"}],
            comments: [{name: "John", comment: 'haha'}, {name: "May", comment: "hehe"}, {name: "Wed", comment: "hihi"}]
        },
    ]
};

export default class FeedsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderMomentView = this.renderMomentView.bind(this);
        this.renderPostsView = this.renderPostsView.bind(this);
    }

    renderMomentView(dataSource) {
        return (
            <View style={styles.momentsContainer}>
                <Text style={styles.momentsTitleText}>MOMENT</Text>
                <ListView
                    horizontal={true}
                    style={styles.momentsListView}
                    dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(dataSource)}
                    renderRow={(data) =>
                        <View style={styles.momentItem}>
                            <TouchableOpacity style={[styles.momentImageContainer,
                                {borderColor: data.seen === false ? BACKGROUND_COLOR : PRIMARY_COLOR}]}>
                                <Image source={{uri: data.image}} style={styles.momentImage}/>
                            </TouchableOpacity>
                            <Text style={styles.momentText}>{data.name}</Text>
                        </View>
                    }
                />
            </View>
        )
    }

    renderPostsView(dataSource) {
        return (
            <ListView
                style={styles.postsListView}
                dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(dataSource)}
                renderRow={(data) =>
                    <View style={styles.postItem}>
                        <View style={styles.postHeader}>
                            <Image style={styles.postAvatar} source={{uri: data.avatar}}/>
                            <View style={styles.postSubHeaderContainer}>
                                <Text style={styles.postUserNameText}>{data.name}</Text>
                                <Text style={styles.postTimeText}>{data.time}</Text>
                            </View>
                            <FontAwesomeIcon style={{alignSelf: 'center'}} name="chevron-down"/>
                        </View>
                        <Text style={styles.postStatus}>{data.status}</Text>
                        <Image style={styles.postImage} source={{uri: data.image}}/>
                        <View style={styles.postFooter}>
                            <TouchableOpacity style={styles.postActionContainer}>
                                <FontAwesomeIcon style={styles.postActionIcon} name="thumbs-up" size={H1_FONT_SIZE}
                                                 color={ON_SURFACE_COLOR}/>
                                <Text style={styles.postActionText}>{data.like.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postActionContainer}>
                                <FontAwesomeIcon style={styles.postActionIcon} name="comment" size={H1_FONT_SIZE}
                                                 color={ON_SURFACE_COLOR}/>
                                <Text style={styles.postActionText}>{data.comments.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postActionContainer}>
                                <FontAwesomeIcon style={styles.postActionIcon} name="share" size={H1_FONT_SIZE}
                                                 color={ON_SURFACE_COLOR}/>
                                <Text style={styles.postActionText}>{data.share.length}</Text>
                            </TouchableOpacity>
                            <FontAwesomeIcon style={styles.postActionMenuIcon} name="ellipsis-h" size={H1_FONT_SIZE}
                                             color={ON_SURFACE_COLOR}/>
                        </View>
                    </View>
                }
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <FontAwesomeIcon style={styles.headerIcon} name="camera" size={H1_FONT_SIZE} color={PRIMARY_COLOR}/>
                    <View style={styles.searchTextContainer}>
                        <FontAwesomeIcon style={styles.headerIcon} name="search" size={H1_FONT_SIZE}
                                         color={ON_SURFACE_COLOR}/>
                        <TextInput style={styles.searchText} placeholder="Search"
                                   underlineColorAndroid='transparent'
                        />
                    </View>
                    <FontAwesomeIcon style={styles.headerIcon} name="edit" size={H1_FONT_SIZE} color={PRIMARY_COLOR}/>

                </View>
                <ScrollView style={styles.feedScrollView}>
                    {this.renderMomentView(exampleData.moments)}
                    {this.renderPostsView(exampleData.posts)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor:SURFACE_COLOR},
    headerBar: {
        backgroundColor:BACKGROUND_COLOR,
        flexDirection: 'row',
        aspectRatio:8,
        justifyContent: 'space-between',
        paddingTop: '2%',
        borderBottomWidth: 1,
        borderColor: SURFACE_COLOR
    },
    headerIcon: {
        alignSelf: 'center',
        margin: '2%'
    },
    searchTextContainer: {
        flexDirection: 'row',
        backgroundColor: SURFACE_COLOR,
        borderRadius: 100,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: '2%'
    },
    searchText: {
        flex: 1,
    },

    feedScrollView: {
        flex:1,
        backgroundColor:'transparent'
    },

    momentsContainer: {
        width: '100%',
        aspectRatio: 3,
        backgroundColor:BACKGROUND_COLOR
    },
    momentsTitleText: {
        fontSize: SUBTEXT_FONT_SIZE,
        color: ON_SURFACE_COLOR,
        fontFamily: TEXT_FONT_REGULAR,
        marginLeft: '2%',
        marginTop: '1%',
        marginBottom: '2%'
    },
    momentsListView: {
        flex: 1,
    },
    momentItem: {
        height: '100%',
        aspectRatio: 0.8,
        padding: '2%',
    },
    momentImageContainer: {
        aspectRatio: 1,
        width: '100%',
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    momentImage: {
        aspectRatio: 1,
        width: '90%',
        borderRadius: 100
    },
    momentText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
        alignSelf: 'center',
        color: ON_BACKGROUND_COLOR,
    },

    postsListView: {
        backgroundColor:'transparent'
    },
    postItem: {
        marginVertical: '2%',
        backgroundColor:BACKGROUND_COLOR
    },
    postHeader: {
        padding: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postAvatar: {
        width: '10%',
        aspectRatio: 1,
        borderRadius: 100
    },
    postSubHeaderContainer: {
        marginLeft: '2%',
        marginRight: 'auto'
    },
    postUserNameText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
        fontWeight: 'bold',
        color: ON_BACKGROUND_COLOR,
    },
    postTimeText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
    },
    postStatus: {
        padding: '2%',
        fontSize: PARAGRAPH_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
        color: ON_BACKGROUND_COLOR,
    },
    postImage: {
        aspectRatio: 1,
        width: '100%'
    },
    postFooter: {
        borderTopWidth: 1,
        borderColor: SURFACE_COLOR,
        flexDirection: 'row',
        alignItems: 'center'
    },
    postActionContainer: {flexDirection: 'row', margin: '3%', justifyContent: 'center', alignItems: 'center'},
    postActionText: {
        fontSize: SUBTEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_REGULAR,
    },
    postActionIcon: {},
    postActionMenuIcon: {marginLeft: 'auto', marginRight: '2%'},
});