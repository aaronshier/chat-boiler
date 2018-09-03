import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { server, wsport } from '../config'
import { checkForAllTokens } from './auth'

import {
    ImageCacheManager
} from 'react-native-cached-image';
const cacheManager = ImageCacheManager({})

class SocketInitiator extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            connected: false,
        }
    }
    componentDidMount(){
        this.connect()
    }
    connect = () => {
        
        let socket = new WebSocket(wsport);
        // Initiate initial login
        socket.onopen = async () => { 
            console.log("%cSOCKET STATUS: %cCONNECTED", "color: #00aaff","color: #00aa00")
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
                // The initial login condition will be used
                // for recieving socket information that is authorized
                // with the current login token
                //
                // This can be used for fetching online user data and
                // app updates like chat room names/themes/etc that are stored to the device for future alterations
                console.log("%cINITIAL LOGIN STATUS: %cAUTHORIZED", "color: #ff6600","color: #00aa00")
                console.log({data})
                
            }
            
            // If chat
            if(data.type === 'global-chat'){
                // If there is an avatar cache it
                if(data.avatar){
                    cache = await cacheManager.downloadAndCacheUrl(data.avatar)
                }
                this.props.incomingGlobalChat(data)
            }
            
            // If reconnect?
            // ... some code ...
        }

        socket.onclose = async () => {
            //reconnect = setTimeout(t => this.connect(), 1000)
            console.log('connection closed somehow! manage from the SocketManager component')
        }
        socket.onerror = async (e) => {
            //reconnect = setTimeout(t => this.connect(), 1000)
            console.error('Socket encountered error: ', err.message, 'Closing socket');
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