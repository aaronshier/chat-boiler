import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './actions/index'
import { View, Text, TouchableOpacity } from 'react-native'

import { loginToServerWithFacebook, checkForAllTokens } from './components/auth'
import Login from './containers/Login'
import AppRouter from './containers/AppRouter'

class index extends Component<{}> {
  constructor(props){
    super(props)
  
    this.state = {
      login: false
    }
  }
  handleLogin = async (result) => {
    const response = loginToServerWithFacebook(result)
    this.setState({ login: response  })
  }

  handleSignOut = () => {
    this.setState({login: false})
  }
  componentDidMount(){
    // TODO:
    // Set up all checks for
    // tokens for automatic login
    checkForAllTokens()
  }
  render() {
    const screen_props = {
      handleLogin: this.handleLogin,
      handleSignOut: this.handleSignOut
    }
    return (
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}} >
          { this.state.login ? 
            <AppRouter screenProps={screen_props}/>
            :
            <Login screenProps={screen_props}/>
          }
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