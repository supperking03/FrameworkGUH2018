import React, {Component} from 'react'
import MapView from 'react-native-maps'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    TextInput,
    Platform,
    PermissionsAndroid,
    ToastAndroid,
} from "react-native";
import {LATITUDE, LATITUDE_DELTA, LONGITUDE, LONGITUDE_DELTA, MAP_STYLE} from '../config/map'
import {
    BACKGROUND_COLOR, H1_FONT_SIZE, H3_FONT_SIZE, ON_SURFACE_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR,
    SUBTEXT_FONT_SIZE, SURFACE_COLOR,
    TEXT_FONT_REGULAR
} from "../config/const";
import {Icon} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageMarker from "../components/CustomMarker/CustomMarker";
import SlidingUpPanel from "rn-sliding-up-panel";
import MyLocationMarker from "../components/CustomMarker/MyLocationMarker";
import MapSlidingUpContent from "../components/SlidingUpContent/MapSlidingUpContent";

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                visible: false,
                mapRegion:
                    {
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                    },
                myCoordinate:
                    {
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                    },
                mapDelta:
                    {
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
            }
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 26) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }


    componentWillMount() {

        const hasLocationPermission = this.hasLocationPermission();

        if (!hasLocationPermission) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
                // Create the object to update this.state.mapRegion through the onRegionChange function
                let region = {
                    latitude: lat,
                    longitude: long,
                }
                this.setState({myCoordinate: region, mapRegion: region});
            },
            (error) => {
                // See error code charts below.
            }, {enableHighAccuracy: false, timeout: 25000}
        );
    }

    onMarkerPress = () => {
        if (this.state.visible === true) {
            this._panel.transitionTo({toValue: 0, duration: 200})
            setTimeout(() => {
                this.setState({visible: true});
                this._panel.transitionTo(Dimensions.get('window').height * 0.65);
            }, 500);
        }
        else {
            this.setState({visible: true});
            this._panel.transitionTo(Dimensions.get('window').height * 0.65);
        }
    }

    render() {
        const iconSize = Dimensions.get('window').height * 0.11 * 0.6 * 0.7;
        return (
            <KeyboardAwareScrollView style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        ref={map => this._map = map}
                        customMapStyle={MAP_STYLE}
                        onPress={() => {
                            this._panel.transitionTo({toValue: 0, duration: 200})
                        }}
                        initialRegion={{
                            latitude: this.state.mapRegion.latitude,
                            longitude: this.state.mapRegion.longitude,
                            latitudeDelta: this.state.mapDelta.latitudeDelta,
                            longitudeDelta: this.state.mapDelta.longitudeDelta,
                        }}>
                        <MyLocationMarker
                            coordinate={this.state.myCoordinate}/>
                        <ImageMarker
                            avatar={'https://cdn.discordapp.com/attachments/444727313851088907/446911185925963777/unknown.png'}
                            coordinate={{
                                latitude: LATITUDE + 0.02,
                                longitude: LONGITUDE,
                            }}
                            onPress={this.onMarkerPress.bind(this)}/>
                        <ImageMarker
                            avatar={'https://cdn.discordapp.com/attachments/444727313851088907/446911185925963777/unknown.png'}
                            coordinate={{
                                latitude: 37.79847,
                                longitude: -122.4323,
                            }}
                            onPress={this.onMarkerPress.bind(this)}/>
                    </MapView>
                    <View style={{width: '100%', height: '100%'}}>
                        <View style={styles.header}>
                            <View style={styles.headerContent}>
                                <Icon name={'clear'} size={iconSize} color={PRIMARY_COLOR}/>
                                <View style={styles.searchView}>
                                    <Icon name={'search'} size={iconSize * 0.8} color={ON_SURFACE_COLOR}/>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Search'}
                                        placeholderTextColor={ON_SURFACE_COLOR}
                                        underlineColorAndroid={'transparent'}
                                        multiline={false}
                                        onChange={(value) => {

                                        }}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={{
                                margin: '4  %',
                                marginLeft: 'auto',
                            }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        this._map.animateToCoordinate(this.state.myCoordinate, 500);
                                        this._panel.transitionTo({toValue: 0, duration: 200})
                                    }}>
                                    <Ionicons name={'ios-send-outline'} size={iconSize} color={PRIMARY_COLOR}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <SlidingUpPanel
                            visible={this.state.visible}
                            showBackdrop={false}
                            allowDragging={false}
                            ref={panel => this._panel = panel}
                            height={Dimensions.get('window').height * 0.5}
                            draggableRange={{top: Dimensions.get('window').height * 0.5, bottom: 0}}>
                            <MapSlidingUpContent/>
                        </SlidingUpPanel>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
            ;
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                width: '100%',
                height: Dimensions.get('window').height * 0.96,
                justifyContent: 'center',
                alignItems: 'center',
            },
        map:
            {
                position: 'absolute',
                width: '100%',
                height: '100%',
            },
        header:
            {
                width: '100%',
                height: '11%',
                backgroundColor: BACKGROUND_COLOR,
                borderBottomColor: ON_SURFACE_COLOR,
                borderBottomWidth: 2,
                justifyContent: 'flex-end',
                paddingBottom: '2%',
            },
        headerContent:
            {
                width: '100%',
                height: '60%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '3%'
            },
        searchView:
            {
                width: '88%',
                height: '100%',
                backgroundColor: SURFACE_COLOR,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 100,
                paddingHorizontal: '3%',

            },
        textInput:
            {
                width: '90%',
                height: '120%',
            },
        button:
            {
                width: '10%',
                aspectRatio: 1,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: BACKGROUND_COLOR,
            }
    }
);
