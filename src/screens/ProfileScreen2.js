import React, {Component} from 'react'
import {
    Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput
} from "react-native";
import {
    BACKGROUND_COLOR,
    H1_FONT_SIZE, H3_FONT_SIZE, ON_BACKGROUND_COLOR, PARAGRAPH_FONT_SIZE, SUBHEADING_FONT_SIZE, TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "../config/const";
import {Icon} from "react-native-elements";
import globalStore from "../store/global";
import {loginInfo, profile, Realm} from "../store/realm";
import ImageMarker from "../components/CustomMarker/CustomMarker";
import {tabNavigatorHeight} from "./Home/HomeTabNavigation";
import ProfileScreen2SlidingUpContent from "../components/SlidingUpContent/ProfileScreen2SlidingUpContent";
import SlidingUpPanel from "rn-sliding-up-panel";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class ProfileScreen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            info:
                {
                    fullName: '',
                    kids: [
                        {
                            id: 0,
                            fullName: '',
                            gender: 'male',
                            age: 0,
                            avatarImageUrl: '',
                        }
                    ]
                },
            kid:
                {}

        };

        globalStore.register('Profile', (s) => this.setState(s),
            () => {
                return this.state
            });

        this.LoadProfile();
    }


    LoadProfile() {
        //From local
        // const realm = new Realm(profile)
        // if (realm.objects(profile.schema[0].name).length === 1) {
        //     this.setState(previousState => {
        //         return {
        //             info:
        //                 {
        //                     ...previousState.info,
        //                     ...realm.objects(profile.schema[0].name)['0'],
        //                 }
        //         }
        //     });
        //     globalStore.updateData('Profile', {info: {...JSON.parse(realm.objects(profile.schema[0].name)['0'].profile)}});
        // }
        // else {
        //     this.setState({isLoading: true})
        // }
        // realm.close();
        //
        // if (globalStore.initScreen === false || this.state.isLoading === true) {

        //     //From Server if not call by local navigate
        console.log(globalStore.loadData('loginInfo'));
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/my-profile',
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': 'application/json'
                    }
            }).then((response) => {
                console.log(response.status);
                if (response.status >= 200 && response.status <= 299) {
                    return {
                        status: 'succeeded',
                        data: response.json()
                    }
                }
                if (response.status >= 400 && response.status <= 499) {
                    console.log(response);
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
        ).then((res) => {
            if (res.status === 'succeeded') {
                res.data.then(data => {
                    console.log(data);
                    this.setState({
                        info: data,
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
            this.setState({isLoading: false});
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.parentInfo}>
                    <View style={styles.parentHeader}>
                        <Text style={styles.parentNameText}>{this.state.info.fullName.toLocaleUpperCase()}</Text>
                        <TouchableOpacity style={{marginLeft: 'auto'}}
                                          onPress={() => {
                                              FBLoginManager.logout(() => {
                                                  this.setState({visible: false});
                                                  globalStore.initScreen = true;

                                                  const realm = new Realm(loginInfo)
                                                  realm.write(() => {
                                                      realm.delete(realm.objects(loginInfo.schema[0].name))
                                                  })

                                                  setTimeout(() => {
                                                      this.props.navigation.goBack();
                                                  }, 1000);
                                              })
                                          }}>
                            <Icon name={'exit-to-app'} size={32}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.childrenInfo}>
                    <ScrollView>
                        {
                            this.state.info.kids.map(kid => {
                                return (
                                    <TouchableOpacity
                                        key={kid.id}
                                        onPress={() => {
                                            this.setState({
                                                kid: kid,
                                                visible: true,

                                            });
                                            globalStore.updateData('CurrentKid', {kid: kid});
                                        }}>
                                        <ImageBackground
                                            source={require('../assets/images/panel.png')}
                                            style={styles.childrenItem}>
                                            <View style={styles.imageView}>
                                                <Image style={styles.imageContainer}
                                                       source={(kid.avatarImageUrl === null) ? (kid.gender === 'MALE')
                                                           ? {uri: 'https://i.imgur.com/fj81k4g.png'}
                                                           : {uri: 'https://i.imgur.com/GfinqA6.png'}
                                                           : {uri: kid.avatarImageUrl}
                                                       }/>
                                            </View>
                                            <View style={styles.DetailView}>
                                                <Text
                                                    style={styles.detailText}>{kid.fullName.toLocaleUpperCase()}</Text>
                                                <Text style={styles.detailsubText}>{kid.age}</Text>
                                            </View>
                                            <Image
                                                style={{
                                                    position: 'absolute',
                                                    left: '75%',
                                                    width: 58,
                                                    height: '40%',
                                                    resizeMode: 'stretch'
                                                }}
                                                source={(kid.gender == 'MALE')
                                                    ? require('../assets/images/baby-boy.png')
                                                    : require('../assets/images/baby-girl.png')}>
                                            </Image>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                                    ;
                            })
                        }
                    </ScrollView>
                </View>
                <PrimaryButton
                    onPress={() => {
                        this.props.navigation.navigate('Setting', {
                            kid: {id: -1, fullName: '', gender: 'MALE', age: 0, avatarImageUrl: '',},
                        });
                    }}
                    color={'#4B7DE8'}
                    textColor={'white'}
                    fontFamily={TEXT_FONT_BOLD}
                    fontSize={20}
                    text={'+ Thêm bé khác'}
                    style={{borderRadius: 0, width: '100%', position: 'absolute', top: height * 0.8}}/>

                <SlidingUpPanel
                    visible={this.state.visible
                    }
                    allowDragging={false}
                    onRequestClose={() => {
                        this.setState({visible: false})
                    }
                    }
                    ref={panel =>
                        this._panel = panel
                    }
                    height={Dimensions.get('window').height * 0.5
                    }
                    draggableRange={
                        {
                            top: Dimensions.get('window').height * 0.5,
                            bottom: 0

                        }
                    }>

                    <
                        ProfileScreen2SlidingUpContent
                        onLoginPress={() => {
                            this.props.navigation.navigate('Password');
                        }
                        }
                        onParentViewPress={() => {
                            this.props.navigation.navigate('ParentMenu');
                        }
                        }
                        onSettingPress={() => {
                            this.props.navigation.navigate('Setting', {kid: this.state.kid})
                        }
                        }
                        onDeletePress={() => {
                            alert('Delete');
                        }
                        }
                        onCancelPress={() => {
                            this.setState({visible: false});
                        }
                        }
                    />
                </SlidingUpPanel>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:
        {
            width: '100%',
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
        },
    parentInfo:
        {
            width: '100%',
            height: '13%',
            alignItems: 'center',
        },
    parentHeader:
        {
            width: '100%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            elevation: 3,
            borderColor: 'white',
            borderWidth: 5,
            borderTopWidth: 0,
        },
    parentNameText:
        {
            fontSize: 22,
            fontFamily: TEXT_FONT_BOLD,
            color: 'black',
        },
    childrenInfo:
        {
            width: '70%',
            height: '60%',
            paddingVertical: '5%',
        },
    childrenItem:
        {
            width: '100%',
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
    imageView:
        {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
    imageContainer:
        {
            height: 60,
            aspectRatio: 1,
            borderRadius: 40,
            borderColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
        },
    DetailView:
        {
            flex: 2.54,
            height: 70,
            marginLeft: 20,
            justifyContent: 'center',
        },
    detailText:
        {
            fontFamily: TEXT_FONT_BOLD,
            fontSize: 18,
            color: 'black',
        },

    detailsubText:
        {
            fontFamily: TEXT_FONT_REGULAR,
            fontSize: 16,
            color: 'black',
        },
    textinputContainer:
        {
            width: '100%',
            height: '23%',
            justifyContent: 'space-between',
            backgroundColor: 'white'
        },
    titleText:
        {
            fontFamily: TEXT_FONT_BOLD,
            fontSize: H3_FONT_SIZE,
            color: 'black',
        },
    textInput:
        {
            height: '70%',
            width: '100%',
            marginLeft: 'auto',
            backgroundColor: 'white',
            fontSize: 20,
        },
})