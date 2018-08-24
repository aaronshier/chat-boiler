import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './actions/index'
import { View, Text, AsyncStorage, StatusBar, TouchableOpacity } from 'react-native'
import { prefix } from './config'
import { loginToServerWithFacebook, loginWithAuthTokens, checkForAllTokens, logOutAll } from './components/auth'
import Login from './containers/Login'
import AppRouter from './containers/AppRouter'
import SocketInitiator from './components/SocketManager'

import SplashScreen from 'react-native-splash-screen'

class index extends Component<{}> {
  constructor(props){
    super(props)
  
    this.state = {
      credentials: false,
      loaded: false,
      socket: false,
    }
  }
  handleLogin = (result) => {
    this.setState({ credentials: result  })
  }

  handleSignOut = async () => {
    const logout = await logOutAll()
    this.setState({credentials: false})
  }
  
  async componentWillMount(){
    let response = false
    const tokens = await checkForAllTokens().catch(e => console.log('there was an error in index.js/checkForAllTokens()', e))
    if(tokens) response = await loginWithAuthTokens(tokens)
    if(response.login){
      console.log('login happened')
      await this.setState({ credentials: response, loaded: true  })
      await this.props.userData(response)
      SplashScreen.hide()
    } else {
      console.log('login didnt happen', response)
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
          <StatusBar
            backgroundColor="#ccc"
            barStyle="dark-content"
          />
          {
            // Once the user has logged in open the socket
            this.state.credentials && this.state.loaded &&
              <SocketInitiator socketOpen={open =>this.setState({socket: open})}/>
          }

          { 
            // Once the user has logged and the socket is open, load the app
            this.state.credentials && this.state.loaded && this.state.socket &&
              <AppRouter screenProps={{credentials: this.state.credentials, ...screen_props}}/> 
          }
            
          { 
            !this.state.credentials && this.state.loaded && !this.state.socket && <Login screenProps={screen_props}/> 
          }
        </View>
    )
  }
}

function mapStateToProps(redux) {
  return {
    redux
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(index)