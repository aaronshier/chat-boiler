const FBSDK = require('react-native-fbsdk');

import { server } from '../../config'
const {
  LoginButton,
  AccessToken
} = FBSDK;

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
}