import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
            message: 'Anything you want!',
            open_message: false
		}
		this.formatMessage = this.formatMessage.bind(this)
		this.sendNewMessage = this.sendNewMessage.bind(this)
    }

    formatMessage(message, auth){
        message.username = this.props.redux.user.username
        return JSON.stringify({
            type: 'global-chat',
            message,
            auth
        })
    }

    async sendNewMessage(message){
        let auth = await checkForAllTokens()
        let msg = this.formatMessage(message, auth)
        msg.username = this.props.redux.user.username
        await this.props.redux.socket.send(msg)
    }

    render() {
		const ChatRoomMessages = (props) => {
			const { item } = props
			let self = item.user_id === this.props.redux.user._id
			return (
				<div style={{
					display: 'flex', flexDirection: self ? 'row-reverse' : 'row',
					alignItems: 'center'}}>
						<div style={{padding: '0 6px'}}>
						{ // The avatar logic
							item.avatar ?
								<img style={{
									borderRadius: 13,
									height: 26,
									width: 26,
									marginTop: 3.5,}}
									src={item.avatar} />
									:
								<img style={{
									borderRadius: 13,
									height: 26,
									width: 26,
									marginTop: 3.5,}}
									src={'/images/temp_avatar.png'} />
							
						}
						</div>
						<div>
							<p style={{
								    textAlign: self ? 'right' : 'left',
								fontSize: 7,
								margin: '3px 0',
								padding: 0}}>{
									item.username}
							</p>
							<div style={{
									alignSelf: self ? 'flex-end' : 'flex-start',
									backgroundColor: '#0af',
									borderRadius: 16,
									overflow: 'hidden',
									padding: '5px 10px',
									marginBottom: 10,
									maxWidth: 'calc(100% - 48)'
							}}>
								<p style={{
									color: '#fff',
									margin: 0,
									padding: 0,
									fontSize: 12
								}}>
									{item.message}
								</p>
							</div>
						</div>
				</div>
			)
	}
		
		return (
            <div style={styles.fillSpace}>
				<div style={styles.card}>
					<h1 style={{textAlign: 'center'}}>CHAT HOME</h1>
					<p>Welcome to the chat boiler website.  This page syncs with your chat websocket allowing for real time connection to the app.  Bellow is the global chat room streaming live from the entry time</p>
				</div>
				<div style={{
					padding: 20,
					backgroundColor: '#eee',
					minHeight: 100,
					margin: '0 auto 40px',
					borderRadius: 10,
					maxWidth: '280px'
				}}>
					{ this.props.redux.global_messages.length > 0 ?
						this.props.redux.global_messages.map(item => <ChatRoomMessages item={item}/> ) 
					:
						<p>No messages yet... try provoking someone</p>
					}
				</div>
            </div>
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

const styles = {
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
	},
	card: {
		maxWidth: 650,
		padding: 20,
		margin: 'auto'
	}
}
