const FBSDK = require('react-native-fbsdk');

import { server, status_codes } from '../../config'
const {
  LoginManager,
  AccessToken
} = FBSDK;

<<<<<<< HEAD
export const loginToServerWithFacebook = async (token) => {
    
    if(token.accessToken){
        token = token.accessToken.toString()
    }

    let login
    let user = {}

    console.log({token})

    if(token){
        login = await fetch(`${server}/auth/facebook/token`, {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response=>response.json())
        .catch(e => console.log('there was an error in loginToServerWithFacebook', e))
    }
    if(login){
        user = login.user
        user.token = login.token
        user.login = true
        return user
    } else {
        return false
    }
}

export const checkForFacebookToken = async () => {
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
}