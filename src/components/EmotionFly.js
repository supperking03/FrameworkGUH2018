import React, {Component} from 'react'
import {TouchableOpacity, View, Text, FlatList, Image, StyleSheet, Animated, Easing, Dimensions} from 'react-native'

var {height, width} = Dimensions.get('window');
import PropTypes from 'prop-types';
import {ON_PRIMARY_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_MEDIUM} from "../config/const";
import IoIcon from 'react-native-vector-icons/Ionicons'


const propTypes = ({
    color: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
    emotion: PropTypes.any
});

const defaultProps = {
    style: {},
    emotion: {},
    color: PRIMARY_COLOR,
    onPress() {
    }
};

export default class EmotionFly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: new Animated.Value(height + 100),
            appear: this.props.emotion.appear
        };
    }

    componentWillMount() {
        setTimeout(() => {
            Animated.timing(
                this.state.left,
                {
                    toValue: -100,
                    duration: 5000,
                }
            ).start()
        }, this.props.emotion.startTime);
    }

    render() {

        const {emotion} = this.props;
        let backgroundColor = 'blue';
        let iconColor = 'white';
        switch (emotion.name) {
            case "md-thumbs-up" :
                backgroundColor = 'blue';
                break;

            case "md-heart" :
                backgroundColor = 'red';
                break;
            case "md-sad" :
                backgroundColor = 'yellow';
                iconColor = 'black';
                break;
            case "md-happy" :
                backgroundColor = 'yellow';
                iconColor = 'black';
                break;
        }

        return (
            <Animated.View style={[
                {
                    position: 'absolute', top: emotion.top, left:emotion.left,
                    borderRadius: 100, backgroundColor: backgroundColor
                }
            ]}>
                <IoIcon style={{alignSelf: 'center'}} name={emotion.name} size={20}
                        color={iconColor}/>
            </Animated.View>
        )
    }
};


EmotionFly.propTypes = propTypes;
EmotionFly.defaultProps = defaultProps;
