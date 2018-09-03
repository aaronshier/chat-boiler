import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import Header from '../components/Header'
import ChatRoomMessages from '../components/chat/ChatRoomMessages'
import MessageInputBar from '../components/chat/MessageInputBar'
import SlideUpMessage from '../components/UI/SlideUpMessage'

import { checkForAllTokens } from '../components/auth'

class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
            message: 'Anything you want!',
            open_message: false
        }
        this.socket = this.props.redux.socket
    }

    formatMessage = (message, auth) => {
        message.username = this.props.redux.user.username
        return JSON.stringify({
            type: 'global-chat',
            message,
            auth
        })
    }

    sendNewMessage = async (message) => {
        let auth = await checkForAllTokens()
        let msg = this.formatMessage(message, auth)
        msg.username = this.props.redux.user.username
        await this.socket.send(msg)
    }

    openme = () => {
        console.log({SlideUpMessage})
        SlideUpMessage.openMessage()
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