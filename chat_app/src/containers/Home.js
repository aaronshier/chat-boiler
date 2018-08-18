import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'

class Home extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" style={{alignSelf: 'center', fontSize: 60}}/>
                <Text style={{textAlign: 'center', fontSize: 30}}>
                    Home
                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)