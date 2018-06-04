import React, {Component} from 'react'
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import {
  ON_PRIMARY_COLOR,
  PARAGRAPH_FONT_SIZE,
  PRIMARY_COLOR,
  TEXT_FONT_MEDIUM
} from "../../config/const";

const propTypes = ({
  text: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.number,
  color: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  onPress: PropTypes.func,
});

const defaultProps = {
  text: 'Primary Button',
  width: '100%',
  height: 53,
  color: PRIMARY_COLOR,
  textColor: ON_PRIMARY_COLOR,
  fontFamily: TEXT_FONT_MEDIUM,
  fontSize: PARAGRAPH_FONT_SIZE,
};

export default class PrimaryButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {text, width, height, color, textColor, fontSize, fontFamily, onPress} = this.props;

    let buttonStyle = StyleSheet.flatten([{
      width: width,
      height: height,
      borderRadius: height * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color
    }, this.props.style]);

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
        >
          <Text style={[{
            color: textColor,
            fontSize: fontSize,
            fontFamily: fontFamily
          }, this.props.textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
  }
}

PrimaryButton.propTypes = propTypes;
PrimaryButton.defaultProps = defaultProps;
