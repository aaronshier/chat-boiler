import React, { Component } from 'react'
import { KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import TxtInput from '../TxtInput'
import Btn from '../UI/Btn'
import SlideUpMessage from '../UI/SlideUpMessage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../../actions'

class MessageInputBar extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
            user_id: this.props.redux.user._id,
            message: '',
            mention: '@anyone',
            chaticon: 'finger'
        }
    }
    render() {
        const offset = (Platform.OS === 'android') ? -200 : 0;
        return (
            <KeyboardAvoidingView style={{width: '100%'}} behavior="padding" keyboardVerticalOffset={offset} enabled>
                <TxtInput 
                    styles={{
                        alignSelf: 'center',
                        width: '100%',
                        borderRadius: 0,
                        marginTop: 10,
                        borderRightWidth: 0,
                        borderLeftWidth: 0,
                    }}
                    placeholder={'Aa'}
                    id={'message'}
                    value={this.state.message}
                    onChange={({prop, val})=>{
                            this.setState({[prop]: val})
                        }
                    } />
                <Btn
                    disable={ this.props.redux.user.username ? false : true}
                    styles={{width: '100%', borderRadius: 0}}
                    onPress={() => {
                        if(this.props.redux.user.username){
                            this.props.sendNewMessage(this.state)
                            this.setState({message: ''})
                        } else {
                            Keyboard.dismiss()
                            this.__error.openMessage('You must first create a username')}
                        }
                    }
                    text={'SEND'} />
                <SlideUpMessage timer={3500} ref={ref => this.__error = ref}/>
            </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageInputBar)