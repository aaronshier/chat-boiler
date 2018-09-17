import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { server, wsURL } from '../../config'
let reconnect

class SocketInitiator extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            connected: false,
        }
        this.connect = this.connect.bind(this)
    }
    componentDidMount(){
        console.log("%cSOCKET STATUS: %cCONNECTING", "color: #00aaff","color: #ffaa00")
        this.connect()
    }
    async connect() {
        clearTimeout(reconnect)
        await this.props.loadSocket({})
        
        let socket = new WebSocket(wsURL)
        
        // Initiate initial login
        socket.onopen = async () => { 
            console.log("%cSOCKET STATUS: %cCONNECTED", "color: #00aaff","color: #00aa00")
            const auth = 'some_token'
            socket.send(JSON.stringify({
                    type: 'initial-login',
                    user: this.props.redux.user,
                    auth
                })
            )
            this.props.loadSocket(socket)
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
                this.props.incomingGlobalChat(data)
            }
            
            // If reconnect?
            // ... some code ...
        }

        socket.onclose = async () => {
            console.log('socket closed! reconnecting')
            await this.props.loadSocket({})
            reconnect = await setTimeout(t => this.connect(), 1000)
        }

        socket.onerror = async (e) => {
            console.log('socket error! closing')
            await socket.close()
            //reconnect = await setTimeout(t => this.connect(), 1000)
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