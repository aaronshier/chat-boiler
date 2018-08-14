const FBSDK = require('react-native-fbsdk');

import { server } from '../../config'
const {
  LoginButton,
  AccessToken
} = FBSDK;

export const loginToServerWithFacebook = async (token) => {
    let login
    let user
    console.log('pre server', token)
    if(token){
        login = await fetch(`${server}/auth/facebook/token`, {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body: JSON.stringify({token: token})
        }).then(response=>response.json())
        .then(res => {
            if(res.status === 200){
                user = res.user
                login = true
                return true
            } else {
                login = false
                return false
            }
        })
    }
    if(login){
        user.token = token.accessToken.toString()
        user.login = true
        return user
    } else {
        return false
    }
}

export const checkForFacebookToken = async () => {
    return await AccessToken.getCurrentAccessToken()
}