import React, {Component} from 'react'
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import {
    ON_PRIMARY_COLOR,
    PARAGRAPH_FONT_SIZE,
    PRIMARY_COLOR, TEXT_FONT_BOLD,
    TEXT_FONT_MEDIUM
} from "../../config/const";
import {PRIMARY_BUTTON_TWO} from "./index";
import PrimaryButton from "./PrimaryButton";

export default class FacebookLoginButton extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <PrimaryButton
            color={'#4B7DE8'}
            textColor={'white'}
            text={'Đăng nhập với Facebook'}
            style={{borderRadius : 0 , width  : '100%'}}
            onPress={() => {
              if (!this.context.isLoggedIn) {
                this.context.login()
              } else {
                this.context.logout()
              }
            }}
            fontFamily={TEXT_FONT_BOLD}
        />
    );
  }
}
