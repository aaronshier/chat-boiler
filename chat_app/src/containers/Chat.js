import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import Btn from '../components/Btn'

class Chat extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {}
    }
    sendNewMessage = () => {
        this.state
        this.props.redux.socket.send(JSON.stringify({}))
    }
    render() {
        return (
             <View style={styles.fillAndCenter}>
                <Icon name="comments" style={{alignSelf: 'center', fontSize: 60}}/>
                <Text style={{textAlign: 'center', fontSize: 30}}>
                    Chat
                </Text>
                <TxtInput styles={{alignSelf: 'center'}} id={'new_message'} onChange={(e, v)=>this.setState({[e]: v})}/>
                <Btn 
                    onPress={this.sendNewMessage} 
                    iconFont={'message'} 
                    //styles={{}} 
                    text={'SEND'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const styles = StyleSheet.create({
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})