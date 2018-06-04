import React, {Component} from 'react'
import {TouchableOpacity, View, Text, FlatList, Image,ActivityIndicator,ImageBackground} from 'react-native'
import CartoonItem from "../../components/CartoonItem/CartoonItem";
import {SURFACE_COLOR} from "../../config/const";
import globalStore from "../../store/global";
import {YouTubeStandaloneAndroid, Youtube} from 'react-native-youtube';
import RefreshableFlatList from 'react-native-refreshable-flatlist';
import cartoonTest from './cartoonTest'
import {Icon} from 'react-native-elements'
import tvShowTest from "./tvShowTest";

export default class TvShowScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            limit: 3,
            next: null
        };
        globalStore.register('TvShowScreen', (s) => this.setState(s),
            () => {
                return this.state
            });

    }

    componentWillMount(){
        this.refresh();
    }



    refresh = () => {
        let start=0;

        if (this.state.next === null) {
            start = 0;
        }
        else {
            start=(this.state.next> tvShowTest.length)?tvShowTest.length:this.state.next;
        }

        let end=(this.state.next+ this.state.limit> tvShowTest.length)?tvShowTest.length:start+this.state.limit;
        this.setState({videos: tvShowTest.slice(start,end),next:end});
    };



    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={{flex: 1, backgroundColor: SURFACE_COLOR}}>

                <ImageBackground
                    resizeMode={"stretch"}
                    source={require('../../../src/assets/images/tvShowHeader.png')} style={{width:'100%',aspectRatio:5}}>
                    <TouchableOpacity style={{height:'100%',aspectRatio:1,justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{this.props.navigation.goBack()}}
                    >
                        <Icon name="keyboard-arrow-left" size={40} color="white"/>
                    </TouchableOpacity>
                </ImageBackground>
                <RefreshableFlatList
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    data={this.state.videos}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 2}}/>
                    )}
                    onLoadMore={() => {
                        this.refresh()
                    }}

                    renderItem={
                        ({item}) => {
                            return (
                                <CartoonItem
                                    data={item}
                                    onVideoPress={() => this.props.navigation.navigate("VideoScreen", {data: item})}/>
                            )
                        }
                    }
                />
            </View>
        )
    }

    // refresh = () => {
    //     fetch('http://150.95.110.222:23300/api/v2/users/' + 99 + '/kids/' + 99 + '/cartoons'
    //         + '?' + 'limit=' + this.state.limit + (this.state.next === null ? '' : "&next=" + this.state.next), {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + 99,
    //             'Content-Type': "application/json",
    //         }
    //     }).then((response) => {
    //
    //             if (response.status >= 200 && response.status <= 299) {
    //                 return {
    //                     status: 'succeeded',
    //                     data: response.json()
    //                 }
    //             }
    //             if (response.status >= 400 && response.status <= 499) {
    //                 return {
    //                     status: 'checked-error',
    //                     data: response.json()
    //                 }
    //             }
    //             return {
    //                 status: 'unknown-error',
    //                 data: response.text()
    //             }
    //         }
    //     ).then((res) => {
    //         if (res.status === 'succeeded') {
    //             res.data.then(s => {
    //                 console.log(s);
    //                 if (this.state.videos.length === 0)
    //                     this.setState({videos: s.cartoons, next: s.next});
    //                 else {
    //                     this.setState({videos: this.state.videos.concat(s.cartoons), next: s.next});
    //                 }
    //             })
    //         }
    //         else if (res.status === 'checked-user') {
    //             res.data.then(s => {
    //                 console.log(s)
    //             });
    //         }
    //         else {
    //             res.data.then(s => {
    //                 console.log(s)
    //             });
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }
}
