import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    View,
    Easing,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import PropTypes from 'prop-types';
import {ON_PRIMARY_COLOR, PARAGRAPH_FONT_SIZE, PRIMARY_COLOR, TEXT_FONT_MEDIUM} from "../../config/const";
import IoIcon from 'react-native-vector-icons/Ionicons'

var {width, height} = Dimensions.get('window');

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
};
export default class EmotionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(0),
            top: Math.floor(Math.random() * height-150) + height-200,
            left: Math.floor(Math.random() * width) + 1,
            appear:false
        };

    }


    componentWillMount() {
        setTimeout(() => {
            this.setState({appear:true});
            Animated.spring(
                this.state.scale,
                {
                    toValue: 2.5,
                    duration: 5000,
                    easing: Easing.back
                }
            ).start(()=>{this.setState({appear:false})})
        }, this.props.emotion.startTime);
    }

    render() {
        const {emotion} = this.props;
        let backgroundColor = 'blue';
        let iconColor = 'white';
        switch (emotion.name) {
            case "md-thumbs-up" :
                backgroundColor = '#4080FF';
                break;

            case "md-heart" :
                backgroundColor = '#F25268';
                break;
            case "md-sad" :
                backgroundColor = '#f1c40f';
                iconColor = 'black';
                break;
            case "md-happy" :
                backgroundColor = '#f1c40f';
                iconColor = 'black';
                break;
        }
        return (
            (this.state.appear===false)?<View/>:
            <Animated.View style={[{borderRadius: 100},
                this.props.style, {
                    justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', top: this.state.top, left: this.state.left,
                    borderRadius: 100, backgroundColor: backgroundColor,
                    padding:1,
                    transform: [
                        {
                            scale: this.state.scale.interpolate({
                                    inputRange: [1, 5],
                                    outputRange: [1, 5]
                                }
                            )
                        },
                    ]
                }

            ]}>
                <TouchableOpacity onPress={this.onPress} activeOpacity={0}>
                    <IoIcon style={{alignSelf: 'center'}} name={emotion.name} size={20}
                            color={iconColor}/>
                </TouchableOpacity>
            </Animated.View>

        );
    }
}

EmotionButton
    .propTypes = propTypes;
EmotionButton
    .defaultProps = defaultProps;
