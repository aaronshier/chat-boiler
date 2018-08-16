import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './actions/index'
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { prefix } from './config'
import { loginToServerWithFacebook, loginWithAuthTokens, checkForAllTokens, logOutAll } from './components/auth'
import Login from './containers/Login'
import AppRouter from './containers/AppRouter'

import SplashScreen from 'react-native-splash-screen'

class index extends Component<{}> {
  constructor(props){
    super(props)
  
    this.state = {
      login: false,
      loaded: false
    }
  }
  handleLogin = (result) => {
    console.log({handleLogin: result})
    this.setState({ login: result  })
  }

  handleSignOut = async () => {
    const logout = await logOutAll()
    this.setState({login: false})
  }

  async componentWillMount(){
    let response = false
    const tokens = await checkForAllTokens().catch(e => console.log('there was an error in index.js/checkForAllTokens()', e))
    if(tokens) response = await loginWithAuthTokens(tokens)
    if(response.login){
      console.log('login happened')
      await this.setState({ login: response, loaded: true  })
      SplashScreen.hide()
    } else {
      console.log('login didnt happen')
      await this.setState({loaded: true})
      SplashScreen.hide()
    }
  }

  render() {
    const screen_props = {
      handleLogin: this.handleLogin,
      handleSignOut: this.handleSignOut
    }
    return (
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}} >
        
          { this.state.login && this.state.loaded && <AppRouter screenProps={{user: this.state.login.login, ...screen_props}}/> }
            
          { !this.state.login && this.state.loaded && <Login screenProps={screen_props}/> }
          
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(index)