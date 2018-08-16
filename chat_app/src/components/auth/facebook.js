const FBSDK = require('react-native-fbsdk');

import { server } from '../../config'
const {
  LoginButton,
  AccessToken
} = FBSDK;

<<<<<<< HEAD
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
<<<<<<< HEAD
    return await AccessToken.getCurrentAccessToken().catch(e => console.log('there was an error in checkForFacebookToken', e))
}

export const logOutOfFacebook = async () => {
    const result = LoginManager.logOut()
    return result
=======
export const loginToServerWithFacebook = async () => {
    const token = await AccessToken.getCurrentAccessToken()
    const login = await fetch(`${server}/auth/facebook/token`, {
        method: 'POST',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        },
        body: JSON.stringify({token: token})
    }).then(res=>{
            if(res.status === 200){
                return true
            } else {
                return false
            }
        }
    )
    return {login, token: token.accessToken.toString()}
>>>>>>> parent of 7432380... login auth flow
=======
    return await AccessToken.getCurrentAccessToken()
>>>>>>> parent of 0cca5eb... fb auth setup and splash screen integration
}