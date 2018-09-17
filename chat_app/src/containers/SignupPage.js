import React, { Component } from 'react'
import { SafeAreaView, Text, Dimensions, View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import FBSignUpUserName from '../components/FBSDK/FBSignUpUserName'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import { AsyncStorage } from "react-native"
import Btn from '../components/UI/Btn'
import SlideUpMessage from '../components/UI/SlideUpMessage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { server, prefix, status_codes } from '../config'
class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    handleTextInput = async ({prop, val}) => {
        clearTimeout(this._timeout)
        await this.setState({[prop]: val})
        if(prop === 'username'){
            this._timeout = setTimeout(async ()=> {
                const isAvailable = await this.checkUserName()
                this.setState({username_available: isAvailable})
            }, 300)
        }
    }

    checkUserName = async () => {
        return await fetch(`${server}/api/check-username`, {
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${this.props.redux.user.token}`
            },
            method: 'POST',
            body: JSON.stringify({username: this.state.username})
        }).then(res => res.json())
        .then(response => response.nameAvailable )
    }

    handleSignUpSubmission = async () => {
        let signup = await fetch(`${server}/api/mobile/signup`, {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            },
            body: JSON.stringify( this.state )
        }).then( res => res.json() )
        .catch(e => {
            console.log(e, 'handleSignupSubmission had an error on signup page')
        })
        console.log({signup})
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
                <View style={styles.header}>
                    <Icon name="sign-in" style={styles.headerIcon}/> 
                    <Text style={styles.title}>Sign up for ChatApp</Text>
                </View>
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
                    <View>
                    {   // Show icon for username validation
                            this.state.username && this.state.username_available !== null ?
                            (this.state.username_available ?
                                <Icon style={[styles.verify, styles.success]} name="check" />
                                :
                                <Icon style={[styles.verify, styles.fail]} name="exclamation-circle" />) 
                                : null
                        }
                        <TxtInput 
                            id={"username"}
                            handleInput={this.handleTextInput}
                            placeholder={'Username'}
                            onChange={this.handleTextInput}
                            styles={{marginBottom: 10}}
                            autoCapitalize={'words'}
                            />
                    </View>
                    <TxtInput
                        id={"password"}
                        onChange={this.handleTextInput}
                        placeholder={'Password'}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'none'}
                        value={this.props.redux.login_creds.password}
                        secureTextEntry={true}
                    />
                    <TxtInput
                        id={"confirm_password"}
                        onChange={this.handleTextInput}
                        placeholder={'Confirm Password'}
                        styles={{marginBottom: 10}}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
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
                        iconFont={'chevron-left'}
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
        fontSize: 100,
        alignSelf: 'center'
    },
    verify:{
        position: 'absolute',
        left: -20,
        top: 14
    },
    success: {
        color: '#0a0',
    },
    fail: {
        color: '#a00',
    }
})