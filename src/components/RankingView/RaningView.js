import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    View,
    Easing,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import PropTypes from 'prop-types';
import {
    BACKGROUND_COLOR, ON_BACKGROUND_COLOR,
    ON_PRIMARY_COLOR,
    PARAGRAPH_FONT_SIZE,
    PRIMARY_COLOR,
    TEXT_FONT_MEDIUM
} from "../../config/const";
import IoIcon from 'react-native-vector-icons/Ionicons'

var {width, height} = Dimensions.get('window');

const propTypes = ({
    color: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
    data: PropTypes.any
});

const defaultProps = {
    style: {},
    data: {},
    color: PRIMARY_COLOR,
};
export default class RankingView extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    componentWillMount() {
        // setTimeout(() => {
        //     this.setState({appear: true});
        //     Animated.spring(
        //         this.state.scale,
        //         {
        //             toValue: 2.5,
        //             duration: 5000,
        //             easing: Easing.back
        //         }
        //     ).start(() => {
        //         this.setState({appear: false})
        //     })
        // }, this.props.emotion.startTime);
    }

    renderRank = () => {
        return (
            this.props.data.map(item => {
                    return (
                        <View style={{
                            width: 200, height: 50, flexDirection: 'row',
                            borderColor: 'transparent',
                            backgroundColor: BACKGROUND_COLOR,
                            alignItems: 'center', margin: '1%',

                        }}>
                            <View style={{width: '10%'}}>
                                <Text style={[
                                    {fontSize: PARAGRAPH_FONT_SIZE, color: ON_BACKGROUND_COLOR},
                                    {fontWeight: (item.rank < 4) ? 'bold' : 'normal'}
                                ]}>{item.rank}</Text>
                            </View>
                            <Image source={{uri: item.imageUrl}}
                                   style={{height: '90%', aspectRatio: 1, borderRadius: 100}}/>
                            <View style={{marginRight: 2,width:'50%'}}>
                                <Text ellipsizeMode="tail" style={[
                                    {fontSize: 15, marginLeft: '2%', color: ON_BACKGROUND_COLOR},
                                    {fontWeight: (item.rank < 4) ? 'bold' : 'normal'}
                                ]}>{item.name}</Text>
                            </View>
                            <View style={{width: '20%' ,height:'100%',justifyContent:'center'}}>
                                <Text style={{alignSelf:'center', color: ON_BACKGROUND_COLOR, fontSize:13}}>{item.score}</Text>
                            </View>
                        </View>
                    )
                }
            )
        )
    };

    render() {
        const {data} = this.props;
        return (
            <View style={{flex: 1}}>
                {this.renderRank()}
            </View>
        );
    }
}

RankingView.propTypes = propTypes;
RankingView.defaultProps = defaultProps;
