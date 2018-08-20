import React, { Component } from 'react'
import { SafeAreaView, Text, AsyncStorage, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import { ActionCreators } from '../actions/index'
import Btn from '../components/Btn'
import TxtInput from '../components/TxtInput'
import { checkForAllTokens, loginWithAuthTokens } from '../components/auth'
import { server, prefix, status_codes } from '../config'


class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }
    
    handleLoginResponse = (response) => {
        if(response.login){
            console.log({response})
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
            let login = await fetch(`${server}/api/mobile/login`, {
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(response => response.json())
            if(login.status < 300)
            await AsyncStorage.setItem(`@${prefix}:jwt`, login.token);
            this.props.screenProps.handleLogin(login)
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
                    iconFont={'envelope'}
                    styles={{marginBottom: 10}}
                    onPress={this.handleLocalLoginSubmission}
                />
                <FBCustomLoginButton handleLoginResult={this.handleLoginResponse} text={'Log In with Facebook'}/>
                <Btn
                    text={'Sign Up'}
                    iconFont={'sign-in'}
                    styles={{marginTop: 10, color: '#fff'}}
                    onPress={()=>this.props.navigation.navigate('SignupPage')}
                />
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