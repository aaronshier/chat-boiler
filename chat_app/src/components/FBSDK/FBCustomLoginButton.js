
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../../actions/index'
import { loginToServerWithFacebook } from '../auth'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

class FBCustomLoginButton extends Component<{}> {

    facebookLogin = () => {
        
        AccessToken.getCurrentAccessToken().then(async api_key => {
            // Attempt a login using the Facebook login dialog asking for default permissions.
            if(!api_key){
                const res = await LoginManager.logInWithReadPermissions(['public_profile'])
                .then(AccessToken.getCurrentAccessToken)
                .then(loginToServerWithFacebook)
                .catch( (error) => { console.log('made it in the LoginManager Error callback', error) })
                return this.props.handleLoginResult(res)
            } else {
                const res = await loginToServerWithFacebook(api_key)
                this.props.handleLoginResult(res)   
            }
        })
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.facebookLogin}>
                <Icon name="facebook" style={[styles.text, {marginRight: 10, fontSize: 20}]}/><Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(FBCustomLoginButton)

const styles = StyleSheet.create({
    button: { 
        backgroundColor: '#3B5998',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 3,
        width: 260,
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16
    }
})