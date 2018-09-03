import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import FBSignUpUserName from '../components/FBSDK/FBSignUpUserName'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import { AsyncStorage } from "react-native"
import Btn from '../components/UI/Btn'
import SlideUpMessage from '../components/UI/SlideUpMessage'
import { server, prefix, status_codes } from '../config'
class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    handleTextInput = ({prop, val}) => {
        console.log({prop, val})
        this.setState({
            [prop]: val
        })
    }

    handleSignUpSubmission = async () => {
        let signup = await fetch(`${server}/api/mobile/signup`, {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            // funky message handling returned from passport for some reason
            // required this little bit to reformat
            if(res._bodyInit) return JSON.parse(res._bodyInit)
            else return res.json()
        }).catch(e => {
            console.log(e, 'handleSignupSubmission had an error on signup page')
        })

        if(signup.status === status_codes.RESOURCE_CREATED){
            await AsyncStorage.setItem(`@${prefix}:jwt`, signup.token);
            this.props.screenProps.handleLogin(signup.user)
        } else {
            this.__error.openMessage(signup.message || 'There seems to have been an error', 'error')
        }
    }

    handleFacebookSignupResponse = (response) => {
        this.__FBSignUpUserName.open(response)
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.title}>Sign up for ChatApp</Text>
                    <TxtInput 
                        id={"email"}
                        handleInput={this.handleTextInput}
                        placeholder={'Email'}
                        onChange={this.handleTextInput}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'none'}
                        />
                    <TxtInput 
                        id={"username"}
                        handleInput={this.handleTextInput}
                        placeholder={'Username'}
                        onChange={this.handleTextInput}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'words'}
                        />
                    <TxtInput
                        id={"password"}
                        onChange={this.handleTextInput}
                        placeholder={'Password'}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'none'}
                    />
                    <TxtInput
                        id={"confirm_password"}
                        onChange={this.handleTextInput}
                        placeholder={'Confirm Password'}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'none'}
                    />
                    <Btn
                        text={'Sign Up with Email'}
                        iconFont={'envelope'}
                        styles={{marginBottom: 10}}
                        onPress={this.handleSignUpSubmission}
                    />
                    <FBCustomLoginButton handleLoginResult={this.handleFacebookSignupResponse} text={"Sign Up With Facebook"}/>
                    <Btn
                        text={'Back to Login Page'}
                        iconFont={'sign-in'}
                        styles={{marginTop: 10, backgroundColor: 'transparent', color: '#000'}}
                        onPress={()=>this.props.navigation.navigate('LoginPage')}
                    />
                    <FBSignUpUserName
                        finishSignUpAndLogin={this.props.screenProps.handleLogin}
                        ref={ref => (this.__FBSignUpUserName = ref)} />
                    <SlideUpMessage 
                        ref={ref => (this.__error = ref)} />
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