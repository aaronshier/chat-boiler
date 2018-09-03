import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../../actions'

import {
    CachedImage as Image,
} from 'react-native-cached-image';

class ChatRoomMessages extends Component<{}> {
    render() {

        return (
            <FlatList
                data={this.props.redux.global_messages}
                keyExtractor={(data, index) => index.toString()}
                renderItem={({item, index, separators}) => {
                    const self = item.user_id === this.props.redux.user._id
                    let loaded = false
                    return(
                        <View style={{
                            flexDirection: self ? 'row-reverse' : 'row',
                            alignItems: 'center'}}>
                            <View style={{paddingHorizontal: 6}}>
                            { // The avatar logic
                                item.avatar ?
                                    <Image style={{
                                        borderRadius: 13,
                                        height: 26,
                                        width: 26,
                                        marginTop: 3.5,
                                        overflow: 'hidden',
                                        resizeMode: 'cover'}}
                                        resizeMode="contain"
                                        onLoad={()=>{loaded = true}}
                                        source={{uri: item.avatar}} />
                                : 
                                <Image
                                    style={{height: 26, marginTop: 3.5, width: 26}}
                                    resizeMode="contain"
                                    source={require('../../images/profiletemp.png')}
                                    onLoad={()=>loaded = true}
                                />
                            }
                            </View>
                            <View>
                                <Text style={{ alignSelf: self ? 'flex-end' : 'flex-start', fontSize: 7,marginVertical: 3}}>{item.username}</Text>
                                <View style={{
                                        alignSelf: self ? 'flex-end' : 'flex-start',
                                        backgroundColor: '#0af',
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        paddingHorizontal: 15,
                                        paddingVertical: 7,
                                        marginBottom: 10,
                                        maxWidth: Dimensions.get('screen').width - 48
                                }}>
                                    <Text style={{
                                        color: '#fff'
                                    }}>
                                        {item.message}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                } }
            />
        )
    }
}

function mapStateToProps(redux) {
    return {
        redux
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMessages)