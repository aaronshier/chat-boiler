import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import ChatRoomMessage from '../components/chat/ChatRoomMessage' 
import { relative } from 'path';
class Chat extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {
            message: 'Anything you want!',
			open_message: false,
			socketSet: false,
			time: new Date()
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

		let timeInterval = setInterval(() => {
			let time = new Date()
			this.setState({
				time
			})
		}, 1000)

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
						maxHeight: 545,
						position: 'relative',
						margin: 'auto'
					}}>
					<img src="/images/iphone-overlay.png" style={{
						position: "absolute",
						width: '320px',
						top: '-30px',
						left: '-20px',
						zIndex: 0,
					}} />
					<div style={{
						height: '35px',
						backgroundColor: '#0af',
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						width: '250px',
						margin: 'auto',
						position: 'relative',
						zIndex: -1
					}}>
						<p style={{
							position: 'absolute',
							left: 20,
							color: '#fff',
							fontSize: '12px',
							top: '2px'
						}}>
							{
								this.state.time.getHours() > 12 ? 
									this.state.time.getHours() - 12
								:
									this.state.time.getHours()
							}:{
								this.state.time.getMinutes()
							}
						</p>
						<i style={{
							position: 'absolute',
							top: 12,
							right: 20,
							color: '#fff'
						}} className="fas fa-battery-full"></i>
					</div>
					<div id="chat_wrap" style={{
						backgroundColor: 'transparent',
						boxShadow: 'inset 2px 3px 2px rgba(0,0,0,.05)',
						overflowY: 'auto',
						margin: '0 auto',
						width: 220,
						height: 497,
						padding: '10px 30px 0',
						borderRadius: 40,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						position: 'relative',
						zIndex: 1,
					}}>
						{ 	this.props.redux.global_messages.length > 0 ?
								this.props.redux.global_messages.map(item => <ChatRoomMessage item={item}/> )
						:
							<p style={{
								margin: 0,
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, calc(-50% - 30px))'
							}}>No messages yet...</p>
						}
					</div>
					<i id="scroll_to_bottom"
						onClick={ this.scrollChatWindowToBottom } style={{
							position: 'absolute',
							bottom: 30,
							right: 40,
							opacity: 0,
							zIndex: 3,
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
