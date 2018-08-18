import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'
import { server, wsport } from '../config'
import { Socket } from '../services'

class SocketInitiator extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            connected: false,
        }
        let socket = new WebSocket(wsport);

        socket.onopen = () => {
            socket.send('---------> this is a mess from the sok <---------')
            this.setState({connected:true})
            this.props.loadSocket(socket)
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