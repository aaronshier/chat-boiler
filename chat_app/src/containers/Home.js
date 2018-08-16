import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'

class Home extends Component<{}> {
    componentWillMount(){
        console.log(this.props)
        
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" style={{fontSize: 32}}/>
                <Text style={{fontSize: 32}}>HOME</Text>
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