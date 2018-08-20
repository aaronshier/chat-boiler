import React, {Component} from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/index'

import { loginToServerWithFacebook } from '../auth/facebook'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
class FBLoginButton extends Component<{}> {
    render() {
        return (

            <View>
                <LoginButton
                    onLoginFinished={
                        async (error, result) => {
                            if (error) {
                                // alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                // alert("login is cancelled.");
                            } else {
                                const result = await loginToServerWithFacebook().catch(e => console.log('there was an error in FBLoginButton/loginToServerWithFacebook()', e))
                                if(result.login){
                                    this.props.handleLoginResult(result)
                                }
                            }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}
                />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FBLoginButton)