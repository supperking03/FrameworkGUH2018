import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native'
import MapView from 'react-native-maps';
import {PRIMARY_COLOR} from "../../config/const";

const propTypes = ({
    avatar: PropTypes.string,
    anchor: PropTypes.any,
    style: PropTypes.any,
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    coordinate : PropTypes.any,

});

const defaultProps = {
    anchor: {x: 0.5, y: 1},
    visible: true,
    color: "green",
    avatar : "https://www.statbeat.com/static/images/default-team-logo-large.png",
    onPress() {
    },

};

export default class ImageMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRender: true
        };
        this.onPressed = this.onPressed.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    onPressed() {
        const {onPress} = this.props;
        onPress();
    }

    onLoad() {
        this.setState({initialRender: false});
    }

    render() {
        const {visible, color, anchor} = this.props;
        return (
            <MapView.Marker
                key={'1'}
                title={'1'}
                onPress={this.onPressed}
                style={visible === false ? styles.hide : [styles.marker, this.props.style]}
                anchor={anchor}
                coordinate={this.props.coordinate}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        key={`${this.state.initialRender}`}
                        onLoad={this.onLoad}
                        source={{uri: this.props.avatar}}>
                    </Image>

                </View>
            </MapView.Marker>
        );
    }
}

ImageMarker.propTypes = propTypes;
ImageMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
    image: {
        width: '100%', height: '100%',
        borderRadius : 100,
        alignItems: 'center'
    },
    hide: {
        width: 0,
        height: 0
    },
    marker: {
        width: 50,
        height: 50,
        elevation : 10,
    },
    imageContainer:
        {
            width : 50,
            aspectRatio: 1,
            borderRadius : 25,
            borderColor : 'white',
            borderWidth: 2.5,
        }
});