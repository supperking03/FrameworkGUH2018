import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from "react-native";
import {BACKGROUND_COLOR, H1_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_BOLD} from "../../../../config/const";
import {Icon} from "react-native-elements";
import {PRIMARY_BUTTON_TWO} from "../../../../components/PrimaryButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import GridView from 'react-native-super-grid';
import globalStore from "../../../../store/global";

export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                photos: [
                    {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    },
                    {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }, {
                        imageUrl: 'https://cdn.discordapp.com/attachments/358293702457819136/444865575714422784/image.jpg',
                    }
                ]
            }

        globalStore.register('Gallery', (s) => this.setState(s),
            () => {
                return this.state
            });
    }

    render() {
        const iconSize = Dimensions.get('window').height * 0.08;
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Icon name={'arrow-back'} size={iconSize * 0.5} color={'white'}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Gallery</Text>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {

                        }}>
                        <FontAwesome name="camera" size={iconSize * 0.4}
                                     color={'white'}/>

                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.body}>
                        <GridView
                            itemDimension={Dimensions.get('window').width * 0.32}
                            fixed={true}
                            spacing={Dimensions.get('window').width * 0.01 - 1}
                            items={this.state.photos}
                            renderItem={(item,idx) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('PhotoView', {
                                            position: idx,
                                            photos: [item],
                                        })
                                    }
                                    }>
                                    <Image
                                        style={styles.image}
                                        source={{uri: item.imageUrl}}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create(
    {
        header:
            {
                width: '100%',
                backgroundColor: PRIMARY_BUTTON_TWO.color,
                height: Dimensions.get('window').height * 0.08,
                paddingHorizontal: '5%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
        body:
            {},
        headerText:
            {
                fontFamily: TEXT_FONT_BOLD,
                fontSize: H1_FONT_SIZE,
                color: BACKGROUND_COLOR,
            },
        image:
            {
                width: '100%',
                aspectRatio: 1,
                resizeMode: 'cover',
            }

    }
);