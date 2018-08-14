import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const Login = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  SignupPage: {
    screen: SignupPage,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default Login;
