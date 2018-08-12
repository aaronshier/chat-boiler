const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

export default async () => {   
    AccessToken.getCurrentAccessToken().then(async api_key => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        if(!api_key){
            const res = await LoginManager.logInWithReadPermissions(['public_profile']).then(
                (result) => {
                    return result
                },
                (error) => {
                    alert('Login fail with error: ' + error);
                })
            return res
        }
    })
}