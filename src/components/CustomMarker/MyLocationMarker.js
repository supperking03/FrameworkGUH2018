import {PRIMARY_COLOR} from "../../config/const";
import React, {Component} from "react";
import MapView from 'react-native-maps';
import {View} from "react-native";

export default class MyLocationMarker extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            initialRender: true
        };
        this.onLoad = this.onLoad.bind(this);
    }
    onLoad() {
        this.setState({initialRender: false});
    }


    render() {
        return (
            <MapView.Marker
                key={'2'}
                coordinate={this.props.coordinate}>
                <View style={{
                    borderRadius : 24,
                    width : 48,
                    aspectRatio: 1,
                    borderColor: 'rgba(84, 88, 247,0.7)',
                    borderWidth: 1,
                    backgroundColor : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        borderRadius : 17.5,
                        width : 35,
                        aspectRatio : 1,
                        backgroundColor : 'rgba(84, 88, 247,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            borderRadius : 7,
                            width : 14,
                            aspectRatio : 1,
                            backgroundColor : 'black',
                            borderColor : 'white',
                            borderWidth : 2 ,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        </View>
                    </View>
                </View>
            </MapView.Marker>
        );
    }

}
