import React, {Component} from 'react'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Text, View, StyleSheet, Dimensions, TextInput, Picker, Image, ScrollView, TouchableOpacity} from "react-native";
import {
    BACKGROUND_COLOR, H1_FONT_SIZE, H3_FONT_SIZE, ON_BACKGROUND_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_REGULAR
} from "./config/const";
import RadioButtonGroup from "./components/RadioButtonGroup/RadioButtonGroup";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";
import globalStore from "./store/global";
import {profile} from "./store/realm";
import ImageResizer from "react-native-image-resizer/index.android";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const array = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];


var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default class ProfileSetting2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kid:
                {
                    id: this.props.navigation.state.params.kid.id,
                    fullName: this.props.navigation.state.params.kid.fullName,
                    age: this.props.navigation.state.params.kid.age.toString(),
                    gender: this.props.navigation.state.params.kid.gender,
                    avatarImageUrl: this.props.navigation.state.params.kid.avatarImageUrl,
                },
            password: '',
        }
    }

    CreateKid() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids',
            {
                method: 'POST',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': "application/json",
                    },
                body:
                    JSON.stringify({
                        "fullName": this.state.kid.fullName,
                        "gender": (this.state.kid.gender == 'Bé trai') ? 'MALE' : 'FEMALE',
                        "age": this.state.kid.age,
                        "avatarImageUrl":this.state.kid.avatarImageUrl,
                        "password": this.state.password
                    }),
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
                    let kids = globalStore.getStateOf('Profile').info.kids;
                    kids = kids.concat([{
                        id: kids.length,
                        fullName: this.state.kid.fullName,
                        age: this.state.kid.age,
                        avatarImageUrl : this.state.kid.avatarImageUrl,
                        gender: (this.state.kid.gender === 'Bé trai') ? 'MALE' : 'FEMALE',
                    }]);

                    console.log(kids);

                    let local =
                        {
                            ...globalStore.getStateOf('Profile').info,
                            kids: kids,
                        };

                    console.log(local);

                    globalStore.updateData('Profile', {info: local});

                    this.props.navigation.goBack();

                    // const realm = new Realm({path : 'profileRealm.realm', schema : [profile]});
                    // realm.write(()=>{
                    //     realm.delete(realm.objects(profile.name));
                    //     realm.create(profile.name,local,true);
                    // })
                    // realm.close();
                    //
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

    UpdateKid() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + this.state.kid.id,
            {
                method: 'PUT',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                        'Content-Type': "application/json",
                    },
                body:
                    JSON.stringify({
                        "fullName": this.state.kid.fullName,
                        "gender": (this.state.kid.gender == 'Bé trai') ? 'MALE' : 'FEMALE',
                        "age": this.state.kid.age,
                        "avatarImageUrl": this.state.kid.avatarImageUrl,
                        "password": this.state.password
                    }),
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
                        let kids = globalStore.getStateOf('Profile').info.kids;
                        for (var i = 0; i < kids.length; i++) {
                            if (kids[i].id == this.state.kid.id) {
                                kids[i] = {
                                    id: this.state.kid.id,
                                    fullName: this.state.kid.fullName,
                                    age: this.state.kid.age,
                                    avatarImageUrl : this.state.kid.avatarImageUrl,
                                    gender: (this.state.kid.gender === 'Bé trai') ? 'MALE' : 'FEMALE',
                                };
                            }
                        }

                        console.log(kids);

                        let local =
                            {
                                ...globalStore.getStateOf('Profile').info,
                                kids: kids,
                            };

                        console.log(local);

                        globalStore.updateData('Profile', {info: local});

                        this.props.navigation.goBack();

                        // const realm = new Realm({path : 'profileRealm.realm', schema : [profile]});
                        // realm.write(()=>{
                        //     realm.delete(realm.objects(profile.name));
                        //     realm.create(profile.name,local,true);
                        // })
                        // realm.close();
                        //
                    }
                )
            }

            else if (res.status === 'checked-user') {
                res
                    .data
                    .then(s => {
                            console.log(s)
                        }
                    )
                ;
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

    deleteKid() {
        fetch('http://150.95.110.222:23300/api/v2/users/' + globalStore.loadData('loginInfo').userId + '/kids/' + this.state.kid.id,
            {})
            .then((response) => {
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
                    let kids = globalStore.getStateOf('Profile').info.kids;
                    kids = kids.filter((e1) => {
                        return e1.id != this.state.kid.id
                    });

                    console.log(kids);

                    let local =
                        {
                            ...globalStore.getStateOf('Profile').info,
                            kids: kids,
                        };

                    console.log(local);

                    globalStore.updateData('Profile', {info: local});

                    this.props.navigation.goBack();

                    // const realm = new Realm({path : 'profileRealm.realm', schema : [profile]});
                    // realm.write(()=>{
                    //     realm.delete(realm.objects(profile.name));
                    //     realm.create(profile.name,local,true);
                    // })
                    // realm.close();
                    //
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

    pickImagePressed = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const data = new FormData();
                ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 80)
                    .then(({uri}) => {
                        data.append('file', {
                            uri: uri,
                            type: 'image/jpeg',
                            name: response.fileName
                        });
                        this.UploadAvatar(data);
                    }).catch((err) => {
                    console.log(err);
                    return alert('Unable to resize the photo',
                        'Check the console for full the error message');
                });
            }
            this.setState({visible: false});
        });
    }

    UploadAvatar(data) {
        fetch('http://150.95.110.222:23300/api/users/' + globalStore.loadData('loginInfo').userId + '/upload-file',
            {
                method: 'POST',
                headers:
                    {
                        'Authorization': 'Bearer ' + globalStore.loadData('loginInfo').accessToken,
                    },
                body: data,
            }).then((response) =>
            (response.status >= 200 && response.status <= 299) ? response.json() : 'Error')
            .then((responseJson) => {
                if (responseJson === 'Error')
                    alert('Lỗi không xác định')
                else {
                    let url = (responseJson.url.startsWith('/') === true) ? ('http://150.95.110.222:23300' + responseJson.url) : responseJson;

                    this.setState(previousState => {
                        return {
                            kid:
                                {
                                    ...previousState.kid,
                                    avatarImageUrl : url,
                                }
                        }
                    })
                }
            }).catch((error) => {
            console.error(error);

        })

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontFamily: TEXT_FONT_BOLD, fontSize: H1_FONT_SIZE, color: 'black'}}>CHỈNH SỬA THÔNG
                        TIN BÉ</Text>
                </View>
                <ScrollView>
                    <View style={{width: '100%', height: height, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={()=>
                            {
                                this.pickImagePressed();
                            }}
                            style={{width: 100, height: 100, borderRadius: 50 , marginTop : 50 , backgroundColor : 'grey'}}>
                            <Image
                                style={{width: 100, height: 100, borderRadius: 40, backgroundColor: BACKGROUND_COLOR}}
                                source={{uri: this.state.kid.avatarImageUrl}}
                            />
                        </TouchableOpacity>
                        <View style={styles.editView}>
                            <View style={styles.textinputContainer}>
                                <Text style={styles.titleText}>Tên bé </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(value) => this.setState(previousState => {
                                        return {
                                            kid:
                                                {
                                                    ...previousState.kid,
                                                    fullName: value
                                                }
                                        }
                                    })}
                                    value={this.state.kid.fullName}
                                    placeholder={'Nhập tên'}
                                    placeholderTextColor={'#BDBDBD'}
                                    underlineColorAndroid={ON_BACKGROUND_COLOR}
                                />
                            </View>
                            <View style={styles.textinputContainer}>
                                <Text style={styles.titleText}>Tuổi </Text>
                                <Picker
                                    mode={'dropdown'}
                                    itemStyle={{fontFamily: TEXT_FONT_REGULAR, fontSize: 20, color: 'black'}}
                                    selectedValue={this.state.kid.age}
                                    style={styles.textInput}
                                    onValueChange={(value) => this.setState(previousState => {
                                        return {
                                            kid:
                                                {
                                                    ...previousState.kid,
                                                    age: value
                                                }
                                        }
                                    })}>
                                    {array.map(item => {
                                        return <Picker.Item label={item} value={item} key={item}/>

                                    })}
                                </Picker>
                            </View>
                            <View style={styles.textinputContainer}>
                                <Text style={styles.titleText}>Giới tính </Text>
                                <RadioButtonGroup
                                    defaultIndex={(this.state.gender === 'MALE') ? 0 : 1}
                                    style={[styles.textInput, {paddingHorizontal: 0, marginTop: 10, height: '60%'}]}
                                    onChangeOption={(value) => {
                                        this.setState(previousState => {
                                            console.log(value);
                                            return {
                                                kid:
                                                    {
                                                        ...previousState.kid,
                                                        gender: value
                                                    }
                                            }
                                        })
                                    }
                                    }
                                    options={['Bé trai', 'Bé gái']}
                                    placeholderTextColor={'#BDBDBD'}
                                    underlineColorAndroid={ON_BACKGROUND_COLOR}
                                />
                            </View>
                            <View style={styles.textinputContainer}>
                                <Text style={styles.titleText}>Mật khẩu </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(value) => this.setState({password: value})}
                                    value={this.state.password}
                                    placeholder={'Nhập mật khẩu'}
                                    placeholderTextColor={'#BDBDBD'}
                                    underlineColorAndroid={ON_BACKGROUND_COLOR}
                                />
                            </View>

                        </View>
                        <View style={styles.btnView}>
                            <PrimaryButton
                                onPress={() => {
                                    if (this.state.kid.id == -1)
                                        this.CreateKid();
                                    else {
                                        this.UpdateKid();
                                    }
                                }}
                                color={'#4B7DE8'}
                                textColor={'white'}
                                fontFamily={TEXT_FONT_BOLD}
                                fontSize={20}
                                text={'THAY ĐỔI'}
                                style={{borderRadius: 0, width: width}}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
            ;
    }
}


const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: height,
                alignItems: 'center',
                backgroundColor: 'white',
            },
        header:
            {
                width: '100%',
                height: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: ON_BACKGROUND_COLOR,
                borderBottomWidth: 1,
                elevation: 2,
            },
        editView:
            {
                width: '90%',
                height: '60%',
                marginTop: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
        textinputContainer:
            {
                width: '100%',
                height: '23%',
                justifyContent: 'space-between',
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
        btnView:
            {
                marginTop: '10%',
                width: '80%',
                height: '15%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }
    }
)