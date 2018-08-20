import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'
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
    
        socket.onopen = () => { 
            this.setState({connected:true})
            this.props.loadSocket(socket)
            this.props.socketOpen(true)
        }
    }
    render() { return null }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketInitiator)