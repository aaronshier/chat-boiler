const FBSDK = require('react-native-fbsdk');
const {
  AppEventsLogger,
} = FBSDK;

export const LogEvent = (value) => AppEventsLogger.logEvent(value);

export const LogPurchase = (value, currency) => AppEventsLogger.logPurchase(value, currency);