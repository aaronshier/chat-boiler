import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import ChatRoomMessage from '../components/chat/ChatRoomMessage' 
class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
            message: 'Anything you want!',
			open_message: false,
			socketSet: false
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

	scrollChatWindowToBottom(slow){
		var objDiv = document.getElementById('chat_wrap');
		let total = objDiv.scrollHeight
		let current = objDiv.scrollTop
		let time = slow ? 100 : 1
		let intvl = setInterval(()=>{
			if(current < total){
				current = current + time
				objDiv.scrollTop = current;
			} else {
				clearInterval(intvl)
			}
		}, 1)
	}
	componentWillReceiveProps(nuProps){
		if(window.socket && !this.state.socketSet){
			this.setState({socketSet: true})
			window.socket.onmessage = (m) => {
				let data = JSON.parse(m.data)
				// If login
				if(data.type === 'initial-login'){
					console.log("%cINITIAL LOGIN STATUS: %cAUTHORIZED", "color: #ff6600","color: #00aa00")
					console.log({data})
					
				}
				// If chat
				if(data.type === 'global-chat'){
					this.props.incomingGlobalChat(data)
					setTimeout(()=>{
						this.scrollChatWindowToBottom(true)
					}, 100)
				}
			}
		}
	}
	componentDidMount(){
		document.getElementById("chat_wrap").addEventListener("scroll", ()=>{
			var objDiv = document.getElementById('chat_wrap');
			let total = objDiv.scrollHeight
			let current = objDiv.scrollTop
		
			if( current < (total - 470) ){
				console.log('current ', current)
				document.getElementById('scroll_to_bottom').style.opacity = 1
			} else {
				console.log('bottom'	)
				document.getElementById('scroll_to_bottom').style.opacity = 0
			}

		});
	}
    render() {
	
		return (
            <div style={styles.fillSpace}>
				<div style={styles.card}>
					<h1 style={{textAlign: 'center'}}>CHAT HOME</h1>
					<p>Welcome to the chat boiler website.  This page syncs with your chat websocket allowing for real time connection to the app.  Bellow is the global chat room streaming live from the entry time</p>
				</div>
				<div style={{
						maxWidth: '280px',
						maxHeight: 460,
						position: 'relative',
						margin: 'auto'
					}}>
					<div id="chat_wrap" style={{
						padding: 20,
						backgroundColor: '#fafafa',
						boxShadow: 'inset 2px 3px 2px rgba(0,0,0,.05)',
						minHeight: 100,
						margin: '0 auto 40px',
						borderRadius: 10,
						maxWidth: '280px',
						maxHeight: 420,
						overflowY: 'auto',
					}}>
						{ 	this.props.redux.global_messages.length > 0 ?
								this.props.redux.global_messages.map(item => <ChatRoomMessage item={item}/> )
						:
							<p>No messages yet... try provoking someone</p>
						}
					</div>
					<i id="scroll_to_bottom"
						onClick={ this.scrollChatWindowToBottom } style={{
							position: 'absolute',
							bottom: 10,
							right: 10,
							opacity: 0,
							transition: 'all .3s ease-in-out'
					}} className="fas fa-chevron-down"></i>
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
