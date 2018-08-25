import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import Header from '../components/Header'
import ChatRoomMessages from '../components/chat/ChatRoomMessages'
import MessageInputBar from '../components/chat/MessageInputBar'

import {
    CachedImage,
    ImageCacheManager
} from 'react-native-cached-image';

import { checkForAllTokens } from '../components/auth'
const cacheManager = ImageCacheManager({})

class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
        }
        this.socket = this.props.redux.socket
    }

    formatMessage = (message, auth) => {
        return JSON.stringify({
            type: 'chat',
            message,
            auth
        })
    }

    sendNewMessage = async (message) => {
        let auth = await checkForAllTokens()
        let msg = this.formatMessage(message, auth)
        await this.socket.send(msg)
    }

    render() {
        return (
            <View style={styles.fillSpace}>
                <Header />
                <ChatRoomMessages />
                <MessageInputBar
                    sendNewMessage={this.sendNewMessage} />
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