import React, {Component} from 'react';
import { View } from 'react-native';

import { loginToServerWithFacebook } from '../auth/facebook'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


class FBLoginButton extends Component<{}> {

    constructor(props){
        super(props)
    
        this.state = {}
    }
    
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
                                const token = await loginToServerWithFacebook()
                            }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}
                />
            </View>
        )
    }
}

export default FBLoginButton