import React, {Component} from 'react';
import {
    Text,
    TextInput, View, Animated, TouchableOpacity, Dimensions
} from 'react-native';
import {ON_BACKGROUND_COLOR, ON_SURFACE_COLOR, PRIMARY_COLOR, SURFACE_COLOR} from "../../config/const";

const screenHeight = Dimensions.get('window').height;

export default class BorderTextInput extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            color: SURFACE_COLOR,
            placeHolderText: this.props.placeholder,
            textSize : new Animated.Value(20),
            marginText :new Animated.Value(0),
        }}

    componentWillMount() {
        if(this.props.value !== '')
        {
            this.setState({
                textSize : new Animated.Value(13),
                marginText :new Animated.Value(screenHeight * 0.06),
            })
        }
    }


    onFocus () {
        Animated.timing(
            this.state.textSize,
            {
                toValue: 13,
                duration: 250,
            }
        ).start();

        Animated.timing(
            this.state.marginText,
            {
                toValue: screenHeight * 0.06,
                duration: 250,
            }
        ).start();

        this.setState({
            color : PRIMARY_COLOR,
        });
    }

    onBlur () {
        if(this.props.value === "")
        {
            Animated.timing(
                this.state.textSize,
                {
                    toValue: 20,
                    duration: 250,
                }
            ).start();

            Animated.timing(
                this.state.marginText,
                {
                    toValue: 0,
                    duration: 250,
                }
            ).start();
        }

        this.setState({
            color : SURFACE_COLOR
        });
    }

    componentDidMount(){

    }

    render(){

        return(
            <View style={this.props.style}>
                <TouchableOpacity
                    activeOpacity = {1}
                    onPress={()=>{
                        this.secondTextInput.focus();
                    }}
                    style={{
                        width: "100%",
                        height: screenHeight * 0.1,
                        borderWidth: 1.5,
                        borderColor: this.state.color,
                        backgroundColor: SURFACE_COLOR,
                        borderRadius: 10,
                        justifyContent: 'center',
                    }}>
                    <Animated.Text style={{
                        marginBottom: this.state.marginText,
                        fontSize: this.state.textSize,
                        marginLeft: 10,
                        color:ON_SURFACE_COLOR
                    }}>{this.state.placeHolderText}</Animated.Text>

                    <TextInput
                        ref={(input) => { this.secondTextInput = input; }}
                        style={{
                            position: 'absolute',
                            marginLeft: 15,
                            flex:1,
                            color: ON_BACKGROUND_COLOR
                        }}
                        underlineColorAndroid ={"transparent"}
                        onFocus ={ () => this.onFocus() }
                        onBlur ={ () => this.onBlur() }
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}