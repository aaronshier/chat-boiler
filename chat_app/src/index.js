import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './actions/index'
import { View, Text, AsyncStorage, StatusBar, TouchableOpacity } from 'react-native'
import { prefix, server } from './config'
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
  handleLogin = async (result) => {
    const login = await this.props.userData({result})
    this.setState({ credentials: result  })
  }

  handleSignOut = async () => {
    const logout = await logOutAll()
    this.setState({
      credentials: false,
      loaded : true,
      socket: false
    })
  }
  
  async componentWillMount(){
    // Setup Login Response
    let response = false

    // Check for tokens and store them in variable
    const tokens = await checkForAllTokens().catch(e => alert('there was an error in index.js/checkForAllTokens()', e))

    // If theres a token, login with the token (will refresh if needed)
    if(tokens) response = await loginWithAuthTokens(tokens)
    
    // Check for response
    if(response && response.login){
      
      // If we have a login response set the state to be logged in with credentials
      await this.setState({ credentials: response, loaded: true  })
      
      // Store user data from response
      await this.props.userData({...response, token: tokens.token || response.token})
      
      // Hide splash screen
      SplashScreen.hide()
    } else {

      // If theres no login response set the app state to loaded to show the login screen
      await this.setState({loaded: true})

      // Hide splash screen
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
              <SocketInitiator closeSocket={this.closeSocket} socketOpen={open =>this.setState({socket: open})}/>
          }

          { 
            // Once the user has logged and the socket is open, load the app
            this.state.credentials && this.state.loaded &&
              <AppRouter screenProps={{credentials: this.state.credentials, ...screen_props}}/> 
          }
            
          { 
            !this.state.credentials && this.state.loaded && <Login screenProps={screen_props}/> 
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