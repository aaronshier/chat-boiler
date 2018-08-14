import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBCustomLoginButton from '../components/FBSDK/FBCustomLoginButton'
import { ActionCreators } from '../actions/index'
import Btn from '../components/Btn'
import TxtInput from '../components/TxtInput'


class LoginPage extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount(){
        console.log()
        this.props.screenProps.handleLogin
    }
    
    handleLoginResponse = (response) => {
        console.log('came back to login page', response)
        this.props.screenProps.handleLogin(response)
    }

    handleTextInput = ({prop, val}) => {
        console.log({prop, val})
        this.setState({
            [prop]: val
        })
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
                    />
                    <FBCustomLoginButton handleLoginResult={this.handleLoginResponse} text={'Log In with Facebook'}/>
                    <Btn
                        text={'Sign Up'}
                        iconFont={'sign-in'}
                        styles={{marginTop: 10, backgroundColor: 'transparent', color: '#000'}}
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