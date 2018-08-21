import { loginToServerWithFacebook, checkForFacebookToken, logOutOfFacebook } from './facebook'
import { checkForLocalToken, loginWithLocalToken, eraseLocalToken } from './local'

export { loginToServerWithFacebook, checkForFacebookToken, checkForLocalToken, logOutOfFacebook }

export const loginWithAuthTokens = async (tokens) => {
    let response
    
    if(tokens.platform === 'facebook'){
        response = await loginToServerWithFacebook(tokens).catch(e => console.log('there was an error in loginWithAuthTokens/loginToServerWithFacebook()', e))
    }

    if(tokens.platform === 'local'){
        response = await loginWithLocalToken(tokens).catch(e => console.log('there was an error in loginWithAuthTokens/loginWithLocalToken()', e))
    }
    return response
}

export const checkForAllTokens = async () => {
    console.log('running checkForAllTokens => {}')
    let facebook = await checkForFacebookToken().catch(e => console.log('there was an error in checkForFacebookTokentoken', e))
    if(facebook) facebook = Object.assign({platform: 'facebook'}, facebook)
    console.log('checkForFacebookToken (facebook) => ', ({facebook}))
    
    console.log('running checkForLocalToken => {}')
    let local = await checkForLocalToken().catch(e => console.log('there was an error in checkForLocalToken', e))
    if(local) local = Object.assign({platform: 'local'}, {token: local})
    console.log('checkForLocalToken (local) => ', {local})
    
    if(local || facebook){
        return (local || facebook || null)
    }
}

export const logOutAll = async () => {
    const facebook = await logOutOfFacebook().catch(e => console.log('there was an error in logOutAll/logOutOfFacebook()', e))
    const local = await eraseLocalToken().catch(e => console.log('there was an error in logOutAll/eraseLocalToken()', e))
    return {facebook}
}