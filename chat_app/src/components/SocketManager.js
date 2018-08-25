import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { server, wsport } from '../config'
import { Socket } from '../services'
import { checkForAllTokens } from './auth'

import {
    ImageCacheManager
} from 'react-native-cached-image';
const cacheManager = ImageCacheManager({})

let reconnect

class SocketInitiator extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            connected: false,
        }
        this.connect()
    }

    connect = () => {
        clearInterval(reconnect)
        
        let socket = new WebSocket(wsport);
        
        // Initiate initial login
        socket.onopen = async () => { 
            console.log('connected!')
            let auth = await checkForAllTokens()
            socket.send(JSON.stringify({
                    type: 'initial-login',
                    user: this.props.redux.user,
                    auth
                })
            )
            this.setState({connected:true})
            this.props.loadSocket(socket)
            this.props.socketOpen(true)
        }

        // Check for initial-login response
        socket.onmessage = async (m) => {
            
            let data = JSON.parse(m.data)
            console.log('data', {data}) // handle initial login methods here

            // If login
            if(data.type === 'initial-login'){
                console.log('initial login!') // handle initial login methods here
            }
            
            // If chat
            if(data.type === 'chat'){
                if(data.avatar){
                    cache = await cacheManager.downloadAndCacheUrl(data.avatar)
                }
                this.props.incomingGlobalChat(data)
            }
            
            // If reconnect?
            // ... some code ...
        }

        socket.onclose = async () => {
            reconnect = setTimeout(t => this.connect(), 1000)
            console.log('connection closed somehow!')
        }
        socket.onerror = async (e) => {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            ws.close();
        }
    }

    render() { return null }
}

function mapStateToProps(redux) {
    return {
        redux
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketInitiator)