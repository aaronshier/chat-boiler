import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { server, wsport } from '../config'
import { Socket } from '../services'
import { checkForAllTokens } from './auth'

class SocketInitiator extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            connected: false,
        }

        let socket = new WebSocket(wsport);
        
        // Initiate initial login
        socket.onopen = async () => { 
            let auth = await checkForAllTokens()
            socket.send(JSON.stringify({
                    type: 'initial-login',
                    user: this.props.redux.user,
                    auth
                })
            )
            // Check for initial-login response
            socket.onmessage = function incoming(m) {
                let data = JSON.parse(m.data)
                if(data.type === 'initial-login') console.log('initial login!') // handle initial login methods here
            }
            
            this.setState({connected:true})
            this.props.loadSocket(socket)
            this.props.socketOpen(true)
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