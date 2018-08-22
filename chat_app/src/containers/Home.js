import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import { checkForAllTokens } from '../components/auth'

class Home extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
        }
        this.socket = this.props.redux.socket
    }
    async componentWillMount(){
        let auth = await checkForAllTokens()
        this.socket.send(JSON.stringify({
                type: 'login',
                user: this.props.redux.user,
                auth
            })
        )
        this.socket.onmessage = (e) => {
            alert(JSON.stringify(e))
            //let message = JSON.parse(e)
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