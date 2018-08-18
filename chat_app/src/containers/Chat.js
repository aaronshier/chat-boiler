import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import Btn from '../components/Btn'
import { checkForAllTokens } from '../components/auth'
class Chat extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            user_id: '123',
            message: '',
            mention: '@anyone',
            chaticon: 'finger'
        }

        this.socket = this.props.redux.socket

        this.socket.onmessage = (d) => {
            let msg = JSON.parse(d.data)
            this.props.incomingGlobalChat(msg)
        }

    }
    formatMessage = (message, auth) => {
        return JSON.stringify({
            type: 'message',
            message,
            auth
        })
    }
    sendNewMessage = async () => {
        let auth = await checkForAllTokens()
        let msg = this.formatMessage(this.state, auth)
        console.log('sending ... ',msg)
        this.socket.send(msg)
    }
    render() {
        return (
            <View style={styles.fillAndCenter}>
                <View style={{flex:1}}>
                </View>
                <View style={{flex:1}}>
                    <Icon name="comments" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Chat
                    </Text>
                    <TxtInput 
                        styles={{alignSelf: 'center', marginTop: 10}}
                        id={'message'}
                        value={this.state.text}
                        onChange={({prop, val})=>{
                            this.setState({[prop]: val})
                          }
                        }/>

                </View>
                <ScrollView style={{flex:1}}>
                    { this.props.redux.global_messages && this.props.redux.global_messages.map( (m, i) => (
                        <Text key={i}>{m.data.message}</Text>
                    )) }
                </ScrollView>
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