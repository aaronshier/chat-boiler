import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import Btn from '../components/Btn'
import Header from '../components/Header'

import {
    CachedImage,
    ImageCacheManager
} from 'react-native-cached-image';

import { checkForAllTokens } from '../components/auth'

class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
            user_id: this.props.redux.user._id,
            message: '',
            mention: '@anyone',
            chaticon: 'finger'
        }

        this.socket = this.props.redux.socket

        this.socket.onmessage = this.recieveMessage

    }

    recieveMessage = async (m) => {
        let data = JSON.parse(m.data)
        const cacheManager = ImageCacheManager({})

        if(this.props.redux.user.avatar){
            console.log('avatar found for user', data)

            const cache = await cacheManager.downloadAndCacheUrl(data.avatar)

            console.log({cache})
        }
        this.props.incomingGlobalChat(data)
    }

    formatMessage = (message, auth) => {
        return JSON.stringify({
            type: 'chat',
            message,
            auth
        })
    }

    sendNewMessage = async () => {
        let auth = await checkForAllTokens()
        let msg = this.formatMessage(this.state, auth)
        await this.socket.send(msg)
        this.setState({message: ''})
    }

    render() {
        return (
            <View style={styles.fillAndCenter}>
                <Header />
                <View style={{flex: 1}}>
                    <ScrollView style={{flex:1}}>
                        { this.props.redux.global_messages && this.props.redux.global_messages.map( (d, i) => (
                        <View key={i} style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'}}>
                                { 
                                    d.avatar && <CachedImage style={{
                                        borderRadius: 13,
                                        marginRight: 10,
                                        height: 26,
                                        width: 26,
                                        resizeMode: 'cover'}} resizeMode="contain" source={{uri: d.avatar.replace(/600/g, '78')}} /> // : <Image style={{height: 35, width: 35}} source={require('../images/tempAvatar.jpg')} /> } 
                                }
                                <Text>{d.message}</Text>
                            </View>
                            <Text style={{fontSize: 7, marginTop: 3}}>USER ID: {d.user_id}</Text>
                        </View>
                        )) }
                    </ScrollView>
                    <KeyboardAvoidingView behavior="padding"  enabled>
                        <TxtInput 
                            styles={{alignSelf: 'center', width: '100%', marginTop: 10}}
                            id={'message'}
                            value={this.state.message}
                            onChange={({prop, val})=>{
                                    this.setState({[prop]: val})
                                }
                            }
                        />
                        <Btn styles={{width: '100%'}} onPress={this.sendNewMessage} text={'SEND'} />
                    </KeyboardAvoidingView>
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const styles = StyleSheet.create({
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})