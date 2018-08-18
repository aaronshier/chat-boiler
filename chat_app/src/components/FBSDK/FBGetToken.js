const FBSDK = require('react-native-fbsdk');
const {
  AccessToken
} = FBSDK;

export default () => {
    return AccessToken.getCurrentAccessToken()
}