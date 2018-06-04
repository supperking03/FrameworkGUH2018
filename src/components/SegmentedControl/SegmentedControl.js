import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types'
import {
  ON_PRIMARY_COLOR,
  PRIMARY_COLOR,
  SUBTEXT_FONT_SIZE,
  TEXT_FONT_REGULAR
} from "../../config/const";

const propTypes = ({
  dataSource: PropTypes.array,
  defaultIndex: PropTypes.number,
  onIndexChange: PropTypes.func,
  color: PropTypes.any,
  secondaryColor: PropTypes.any,
  fontFamily: PropTypes.any,
  fontSize: PropTypes.number,
  width: PropTypes.any,
  height: PropTypes.number,
  style: PropTypes.any,
  textStyle: PropTypes.any,
});

const defaultProps = {
  dataSource: [],
  defaultIndex: 0,
  color: PRIMARY_COLOR,
  secondaryColor: ON_PRIMARY_COLOR,
  fontFamily: TEXT_FONT_REGULAR,
  fontSize: SUBTEXT_FONT_SIZE,
  width: '100%',
  height: 36,
};


export default class SegmentedControl extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.renderItem = this.renderItem.bind(this);
    this.onIndexChange = this.onIndexChange.bind(this);
  }

  onIndexChange(index) {
    this.setState({index: index});
    if (this.props.onIndexChange != null) this.props.onIndexChange(index);
  }

  renderItem() {
    return this.props.dataSource.map((item, index) => {
      let borderRightWidth = (index === this.props.dataSource.length - 1) ? 1 : 0.5;
      let borderLeftWidth = (index === 0) ? 1 : 0.5;
      let borderRightRadius = (index === this.props.dataSource.length - 1) ? this.props.height * 0.5 : 0;
      let borderLeftRadius = (index === 0) ? this.props.height * 0.5 : 0;

      return (
          <TouchableOpacity
              key={index}
              style={[styles.itemContainer, {
                backgroundColor: (this.state.index === index ? this.props.color : this.props.secondaryColor),
                borderColor: this.props.color,
                borderTopLeftRadius: borderLeftRadius,
                borderBottomLeftRadius: borderLeftRadius,
                borderTopRightRadius: borderRightRadius,
                borderBottomRightRadius: borderRightRadius,
                borderLeftWidth: borderLeftWidth,
                borderRightWidth: borderRightWidth,
              }]}
              onPress={() => {
                this.onIndexChange(index);
              }}>
            <Text style={[{
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }, this.props.textStyle, {
              color: (this.state.index === index ? this.props.secondaryColor : this.props.color)
            }]}>{item}</Text>
          </TouchableOpacity>
      );
    })
  }

  render() {
    const {width, height, style} = this.props;
    return (
        <View style={[{flexDirection: 'row', width: width, height: height}, style]}>
          {this.renderItem()}
        </View>
    )
  }
};

SegmentedControl.propTypes = propTypes;
SegmentedControl.defaultProps = defaultProps;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});