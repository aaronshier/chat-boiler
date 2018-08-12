import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        iosClientId: '591037199897-lubdnf7i4gf1sk4l89tq34qagb1597od.apps.googleusercontent.com', // only for iOS
    webClientId: '591037199897-0b7kmsvurolg881sn2lln0min6pnkql2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
    accountName: '', // [Android] specifies an account name on the device that should be used
})
  
class GoogleLoginButton extends Component<{}> {

    signIn = async () => {
        try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo });
        } catch (error) {
            console.log({error})
            if (error.code === '-5') console.log('User canceled login!')
        }
    }

    render() {
        return (
            <GoogleSigninButton
            style={{ width: 48, height: 48 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}/>
        )
    }
}

export default GoogleLoginButton    