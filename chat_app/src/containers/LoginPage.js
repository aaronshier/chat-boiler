import React, { Component } from 'react'
import { SafeAreaView, Text, AsyncStorage, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import { ActionCreators } from '../actions/index'
import Btn from '../components/UI/Btn'
import SlideUpMessage from '../components/UI/SlideUpMessage'
import TxtInput from '../components/TxtInput'
import { checkForAllTokens, loginWithAuthTokens } from '../components/auth'
import { server, prefix, status_codes } from '../config'


class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: '',
            password: '',
            sending: false
        }
    }
    
    handleLoginResponse = (response) => {
        if(response && response.login){
            this.props.screenProps.handleLogin(response)
        }
    }

    handleTextInput = ({prop, val}) => {
        this.setState({
            [prop]: val
        })
    }

    handleLocalLoginSubmission = async () => {
        if(this.state.email && this.state.password){
            this.setState({sending: true})
            let login = await fetch(`${server}/api/mobile/login`, {
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(response => response.json())
            
            this.setState({sending: false})
            if(login.status === status_codes.OK){
                await AsyncStorage.setItem(`@${prefix}:jwt`, login.token);
                await this.setState({sending: false})
                this.props.screenProps.handleLogin(login.user)
            } else {
                console.log(login)
                this._error.openMessage(login.error)
            }

        }
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>Login to ChatApp</Text>
                <TxtInput 
                    id={"email"}
                    handleInput={this.handleTextInput}
                    placeholder={'Email'}
                    onChange={this.handleTextInput}
                    styles={{marginBottom: 10}}
                    autoCapitalize={'none'}
                />
                <TxtInput
                    id={"password"}
                    onChange={this.handleTextInput}
                    placeholder={'Password'}
                    styles={{marginBottom: 10}}
                    autoCapitalize={'none'}
                />
                <Btn
                    text={'Login with Email'}
                    loading={this.state.sending}
                    iconFont={'envelope'}
                    styles={{marginBottom: 10}}
                    onPress={this.handleLocalLoginSubmission}
                />
                <FBCustomLoginButton handleLoginResult={this.handleLoginResponse} text={'Log In with Facebook'}/>
                <Btn
                    text={'Sign Up'}
                    iconFont={'sign-in'}
                    dismissKeyboardOnPress={true}
                    styles={{marginTop: 10, color: '#000', backgroundColor: 'transparent'}}
                    onPress={()=>this.props.navigation.navigate('SignupPage')}
                />
                <SlideUpMessage ref={ref =>this._error = ref} />
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 10
    }
})