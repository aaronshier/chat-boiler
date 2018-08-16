import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'

import FBLoginButton from '../components/FBSDK/FBLoginButton'

class Home extends Component<{}> {
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" style={{fontSize: 32}}/>
                <Text style={{fontSize: 32}}>HOME</Text>
                <FBLoginButton />
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)