import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'

class AddMedia extends Component<{}> {
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="camera" style={{fontSize: 32}}/>
                <Text style={{fontSize: 32}}>AddMedia</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMedia)