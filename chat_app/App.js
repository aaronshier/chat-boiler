import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { View, StyleSheet } from 'react-native'

import Main from './src/containers/Main'
import reducers from './src/reducers'

import createHistory from 'history/createMemoryHistory'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

// import { NativeRouter } from 'react-router-native'

const history = createHistory();

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
<<<<<<< HEAD

  constructor(props){
    super(props)
  
    this.state = {
    }
=======
  componentDidMount(){
    console.log('this is our main props wrapping the app', this.props)
>>>>>>> parent of 7432380... login auth flow
  }
  render() {
    return (
      <Provider store={store}>
          {/* <NativeRouter> */}
            <View style={styles.container}>
              <Main />
            </View>
          {/* </NativeRouter> */}
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})





