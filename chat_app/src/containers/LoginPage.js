import React, { Component } from 'react'
import { View, Text, AsyncStorage, Dimensions, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import { ActionCreators } from '../actions/index'
import Btn from '../components/UI/Btn'
import SlideUpMessage from '../components/UI/SlideUpMessage'
import TxtInput from '../components/TxtInput'
import { checkForAllTokens, loginWithAuthTokens } from '../components/auth'
import { server, prefix, status_codes } from '../config'

import Icon from 'react-native-vector-icons/FontAwesome'


class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: this.props.redux.login_creds.email,
            password: this.props.redux.login_creds.password,
            sending: false
        }
        this._timout
    }
    
    handleLoginResponse = (response) => {
        if(response && response.login){
            this.props.screenProps.handleLogin(response)
        }
    }

    handleTextInput = ({prop, val}) => {
        clearTimeout(this._timout)
        this._timout = setTimeout(()=>{
            let creds = Object.assign({}, this.props.redux.login_creds)
            creds[prop] = val
            this.props.loginFields(creds)
        }, 300)

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
            console.log({login})
            this.setState({sending: false})

            if(login.status === status_codes.OK){
                await AsyncStorage.setItem(`@${prefix}:jwt`, login.token);
                console.log({ITS: login})
                this.props.screenProps.handleLogin(login.user)
            } else {
                this._error.openMessage(login.message)
                // if(login.message === 'Authentication failed. User not found.'){
                //     this.props.navigation.navigate('SignupPage')
                // }
            }

        }
    }
    
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="comments" style={styles.headerIcon}/>
                <Text style={styles.title}>Login to ChatApp</Text>
                <TxtInput 
                    id={"email"}
                    handleInput={this.handleTextInput}
                    placeholder={'Email'}
                    onChange={this.handleTextInput}
                    styles={{marginBottom: 10}}
                    autoCapitalize={'none'}
                    value={this.props.redux.login_creds.email}
                    keyboardType={'email-address'}
                />
                <TxtInput
                    id={"password"}
                    onChange={this.handleTextInput}
                    placeholder={'Password'}
                    styles={{marginBottom: 10}}
                    autoCapitalize={'none'}
                    value={this.props.redux.login_creds.password}
                    secureTextEntry={true}
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
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    header: {
        marginBottom: 20
    },
    headerIcon: {
        fontSize: Dimensions.get('window').width / 2.5,
        alignSelf: 'center'
    }
})