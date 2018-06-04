import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
  ON_BACKGROUND_COLOR, SUBHEADING_FONT_SIZE, PRIMARY_COLOR, SURFACE_COLOR, TEXT_FONT_MEDIUM, PARAGRAPH_FONT_SIZE
} from "../../config/const";

const propTypes = ({
  options: PropTypes.array,
  defaultIndex: PropTypes.number,
  onChangeOption: PropTypes.func,
  width: PropTypes.any,
  height: PropTypes.number,
  style: PropTypes.any,
  textStyle: PropTypes.any
});

const defaultProps = {
  option: [],
  defaultIndex: 0,
  width: '100%',
  height: 46
};

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
          selectedIndex: this.props.defaultIndex,
          option: this.props.options[0],
        };
    this.onChangeOption = this.onChangeOption.bind(this);
  };

  onChangeOption(option) {
    if (this.props.onChangeOption != null) {
      this.props.onChangeOption(option)
    }
  }

  render() {
    const {options} = this.props;
    const style = StyleSheet.flatten([{
      width: this.props.width,
      height: this.props.height,
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: SURFACE_COLOR,
      borderRadius: this.props.height * 0.5,
      borderWidth: 1.5,
    }, this.props.style]);

    const buttonStyle = StyleSheet.flatten({
      borderColor: '#4B7DE8',
      backgroundColor : '#4B7DE8',
      borderRadius: style.height * 0.5,
      borderWidth: 2.5,
      margin: -1.75,
    });

    return (
        <View
            style={[style, {borderRadius: style.height * 0.5}]}>
          {
            options.map((option, idx) => {
              return (
                  <TouchableOpacity
                      key={idx}
                      style={[{flex: 1, justifyContent: 'center', alignItems: 'center'},
                        (idx === this.state.selectedIndex) ? buttonStyle : null
                      ]}
                      onPress={() => {
                        this.setState({selectedIndex: idx});
                        this.onChangeOption(option)
                      }}>
                    {
                      <Text
                          style={[{fontFamily: TEXT_FONT_MEDIUM, fontSize: PARAGRAPH_FONT_SIZE}, this.props.textStyle,
                            (idx === this.state.selectedIndex) ? {color: 'white'} : {color: ON_BACKGROUND_COLOR}
                          ]}
                      >{option}</Text>
                    }
                  </TouchableOpacity>
              );
            })
          }
        </View>
    )
        ;
  }
}

RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;