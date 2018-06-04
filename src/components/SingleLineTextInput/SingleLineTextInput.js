import React, {Component} from 'react';
import {
    TextInput, View, Dimensions
} from 'react-native';
import {ON_BACKGROUND_COLOR, ON_SURFACE_COLOR, PRIMARY_COLOR, SURFACE_COLOR} from "../../config/const";

export default class SingleLineTextInput extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            color: SURFACE_COLOR
        }}

    onFocus () {
        this.setState({
            color : PRIMARY_COLOR
        });
    }

    onBlur () {
        this.setState({
            color : SURFACE_COLOR
        });
    }

    render(){
        return(
            <View style={[{
                width: Dimensions.get('window').width * 0.9,
                borderBottomWidth: 1,
                borderColor: this.state.color,
            },this.props.style]}>
                <TextInput
                    placeholder = {this.props.placeholder}
                    editable = {true}
                    multiline = {false}
                    maxLength = {50}
                    underlineColorAndroid ={"transparent"}
                    style = {{color: ON_BACKGROUND_COLOR}}
                    selectionColor = {this.state.color}
                    placeholderTextColor ={ON_SURFACE_COLOR}
                    onBlur ={ () => this.onBlur() }
                    onFocus ={ () => this.onFocus() }
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                />
            </View>

        );
    }
}