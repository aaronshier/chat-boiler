export { loginToServerWithFacebook, checkForFacebookToken } from './facebook'
export { checkForLocalToken } from './local'
export const checkForAllTokens = async () => {
    const facebook = checkForFacebookToken()
    const local = checkForLocalToken()
    if(facebook || local){
        return (facebook || local)
    }
}