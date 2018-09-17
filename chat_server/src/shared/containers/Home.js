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
			const ChatRoomMessages = (item) => {
			let self = item.user_id === this.props.redux.user._id
			console.log({self})
			return (
				<div style={{
					flexDirection: self ? 'row-reverse' : 'row',
					alignItems: 'center'}}>
						<div style={{paddingHorizontal: 6}}>
						{ // The avatar logic
							item.avatar &&
								<img style={{
									borderRadius: 13,
									height: 26,
									width: 26,
									marginTop: 3.5,}}
									src={item.avatar} />
							
						}
						</div>
						<div>
							<p style={{ alignSelf: self ? 'flex-end' : 'flex-start', fontSize: 7, margin: '3px 0,', padding: 0}}>{item.username}</p>
							<div style={{
									alignSelf: self ? 'flex-end' : 'flex-start',
									backgroundColor: '#0af',
									borderRadius: 16,
									overflow: 'hidden',
									paddingHorizontal: 15,
									paddingVertical: 7,
									marginBottom: 10,
									maxWidth: calc('100%' - 48)
							}}>
								<p style={{
									color: '#fff',
									margin: 0, padding: 0
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
				{
					this.props.redux.global_messages.map(item => {
						<ChatRoomMessages item={item}/>
					})
				}
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
}
