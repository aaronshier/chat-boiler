import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { View, Text, StatusBar, SafeAreaView, StyleSheet } from 'react-native'

import { loginToServerWithFacebook } from './src/components/auth/facebook'

import MainApp from './src'
import Login from './src/containers/Login'

import reducers from './src/reducers'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
      )
  )
  return createStore(reducers, initialState, enhancer)
}

const store = configureStore({})

export default class App extends Component {

  constructor(props){
    super(props)
  
    this.state = {
    }
  }
  componentDidMount(){
    loginToServerWithFacebook()
  }
  render() {
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    )
  }
}
