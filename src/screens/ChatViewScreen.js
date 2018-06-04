import {GiftedChat} from 'react-native-gifted-chat'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {ON_SURFACE_COLOR, PRIMARY_COLOR, SURFACE_COLOR} from "../config/const";

export default class ChatViewScreen extends Component<Props> {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Kien Ngo',
            avatar: 'https://24.p3k.hu/app/uploads/2016/08/captain-america-civil-war-chris-evans-sad-1024x576.jpg',
          },
        },
      ],
    })
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <View style={{
            flex: 0.1,
            borderBottomWidth: 0.6,
            borderColor: 'grey',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TouchableOpacity onPress={() => {
              
            }}
                              style={{
                                marginRight: 'auto',
                                marginLeft: '1%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
              <Icon size={35} name="ios-arrow-round-back"/>
            </TouchableOpacity>
            <View style={{marginRight: 'auto', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>{this.state.messages[0].user.name}</Text>
              <Text style={{color: ON_SURFACE_COLOR, fontSize: 10}}>Online 27 phút trước</Text>
            </View>

          </View>
          <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1,
              }}
          />
        </View>
    )
  }
}