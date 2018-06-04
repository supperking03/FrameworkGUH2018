import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Image, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {
    ON_SURFACE_COLOR,
    PRIMARY_VARIANT_ONE_COLOR, SUBHEADING_FONT_SIZE, SUBTEXT_FONT_SIZE, SURFACE_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "../../../../config/const";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import ImageSlider from "react-native-image-slider";
import globalStore from "../../../../store/global";


export default class PhotoViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showmore: false,
                captionHeight: Dimensions.get('window').height * 0.12,
                photo:
                    {
                        user: {
                            id: 0,
                            fullName: 'Phong',
                            nickName: 'Askaron',
                            avatarImageUrl: 'https://cdn.discordapp.com/attachments/378600864077840391/448026115190161408/unknown.png',
                        },
                        postId: 0,
                        postTime: 0,
                        lastUpdateTime: 0,
                        content: 'Alo 1 2 3 4',
                        imageUrl: 'https://cdn.discordapp.com/attachments/378600864077840391/448047337210773514/unknown.png',
                        numberOfLikes: 0,
                        numberOfComments: 0,
                        liked: true
                    },
                photos: this.props.navigation.state.params.photos,
                position : this.props.navigation.state.params.position,
            }
        globalStore.register('PhotoViewScreen', (s) => this.setState(s),
            () => {
                return this.state
            });

    }

    render() {
        const iconSize = Dimensions.get('window').height * 0.08
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Icon name={'clear'} size={iconSize * 0.5} color={SURFACE_COLOR}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name={'more-horiz'} size={iconSize * 0.5} color={SURFACE_COLOR}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{width: '100%', height: '90%'}}>
                        <ImageSlider
                            images={this.state.photos}
                            customSlide={({index, item, style, width}) => (
                                // It's important to put style here because it's got offset inside
                                <View key={index} style={{flex: 1}}>
                                    <Image source={{uri: item.imageUrl}} style={[style, {resizeMode: 'cover'}]}/>
                                </View>)}
                            customButtons={(position, move) => (
                                <View/>
                            )}
                            position={this.state.position}
                            onPositionChanged={(position) => {
                                var photo = this.state.photos[position];
                                this.setState({photo: photo});
                            }}
                        />
                    </View>
                </View>
                <View
                    style={[styles.footer,
                        {
                            width: Dimensions.get('window').width,
                            height: '12%',
                            position: 'absolute'
                        }]}>
                    <View style={[styles.footerContent]}>
                        <View style={[styles.button, {marginRight: 'auto', justifyContent: 'flex-start'}]}>
                            <Icon name={'thumb-up'} size={iconSize * 0.5 * 0.6}
                                  color={(this.state.photo.liked === true) ? PRIMARY_VARIANT_ONE_COLOR : SURFACE_COLOR}/>
                            <Text style={styles.footerText}>{this.state.photo.numberOfLikes}</Text>
                        </View>
                        <Text style={styles.footerText}>{this.state.photo.numberOfComments} Bình luận</Text>
                    </View>
                    <View style={styles.footerBtnContainer}>
                        <TouchableOpacity style={[styles.button, {marginRight: 'auto'}]}>
                            <EvilIcons name={'like'} size={iconSize * 0.5} color={SURFACE_COLOR}/>
                            <Text style={styles.buttonText}>Thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {marginLeft: 'auto'}]}>
                            <Icon name={'chat-bubble-outline'} size={iconSize * 0.4} color={SURFACE_COLOR}/>
                            <Text style={styles.buttonText}>Bình luận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.footerCaption, {
                        height: this.state.captionHeight
                    }]}
                    onPress={() => {
                        var bool = !this.state.showmore;
                        this.setState({showmore: bool});
                        if (bool === true) {
                            this.setState({captionHeight: Dimensions.get('window').height * 0.744});
                        }
                        else {
                            this.setState({captionHeight: Dimensions.get('window').height * 0.12 * 0.2})
                        }
                    }}>
                    <View
                        style={[{
                            width: '100%',
                            height: this.state.captionHeight,
                            paddingHorizontal: 20,
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                        },
                            (this.state.showmore === true)
                                ? {
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                } : {}]}>
                        <Text style={styles.footerText}>
                            {(this.state.showmore === false)
                                ? this.state.photo.content.substring(0, 20)
                                : this.state.photo.content}
                        </Text>
                        {
                            (this.state.showmore === false)
                                ? <TouchableOpacity
                                    style={{marginLeft: 5}}
                                    onPress={() => {
                                        var bool = !this.state.showmore;
                                        this.setState({showmore: bool});
                                        if (bool === true) {
                                            this.setState({captionHeight: Dimensions.get('window').height * 0.744});
                                        }
                                        else {
                                            this.setState({captionHeight: Dimensions.get('window').height * 0.12 * 0.2})
                                        }
                                    }}>
                                    <Text style={{
                                        fontFamily: TEXT_FONT_BOLD,
                                        fontSize: SUBTEXT_FONT_SIZE - 1,
                                        color: ON_SURFACE_COLOR
                                    }}>Xem thêm...</Text>
                                </TouchableOpacity>
                                : <View/>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
            ;
    }

}

const styles = StyleSheet.create(
    {
        container:
            {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
        header:
            {
                width: '100%',
                height: '8%',
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
        body:
            {
                width: '100%',
                height: '80%',
                justifyContent: 'flex-end',
                marginBottom: Dimensions.get('window').height * 0.12,
            },
        footer:
            {
                height: '12%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 0,
                paddingHorizontal: '2%',

            },
        button:
            {
                width: '30%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            },
        buttonText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: SUBHEADING_FONT_SIZE,
                color: SURFACE_COLOR,
                marginLeft: 8,
            },
        footerCaption:
            {
                width: '100%',
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: Dimensions.get('window').height * 0.11,
            },
        footerContent:
            {
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').height * 0.12 * 0.5 - 0.5,
                paddingHorizontal: 20,
                borderBottomColor: SURFACE_COLOR,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
        footerBtnContainer:
            {
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').height * 0.12 * 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
        footerText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: SUBTEXT_FONT_SIZE,
                color: SURFACE_COLOR,
                marginLeft: 8,
            }

    }
);
