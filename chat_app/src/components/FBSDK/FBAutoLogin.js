const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

export default () => {       
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile']).then(
    function(result) {
        if (result.isCancelled) {
        alert('Login cancelled');
        } else {
        alert('Login success with permissions: '
            +result.grantedPermissions.toString());
        }
    },
    function(error) {
        alert('Login fail with error: ' + error);
    })
}