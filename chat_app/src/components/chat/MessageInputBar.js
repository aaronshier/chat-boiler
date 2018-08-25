import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import TxtInput from '../TxtInput'
import Btn from '../Btn'
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
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={offset} enabled>
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
                    styles={{width: '100%', borderRadius: 0}}
                    onPress={() => {
                        this.props.sendNewMessage(this.state)
                        this.setState({message: ''})
                    } }
                    text={'SEND'} />
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