import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions,  Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { server } from '../config'
import TxtInput from '../components/TxtInput'

import { ActionCreators } from '../actions/index'
import Btn from '../components/UI/Btn'

import Icon from 'react-native-vector-icons/FontAwesome'

class Settings extends Component {

    constructor(props){
        super(props)
    
        this.state = {
            ...this.props.redux.user,
            username_available: null
        }
        this._timeout
    }

    logUserOut = async () => {
        await this.props.redux.socket.close()
        await this.props.userData({})
        this.props.screenProps.handleSignOut()
    }

    checkUserName = async () => {
        return await fetch(`${server}/api/check-username`, {
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${this.props.redux.user.token}`
            },
            method: 'POST',
            body: JSON.stringify({username: this.state.username})
        }).then(res => res.json())
        .then(response => response.nameAvailable )
    }

    updateUser = async () => {
        return await fetch(`${server}/api/update-user`,{
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${this.props.redux.user.token}`
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.json()).catch(e => {
            console.log(e, 'error in update user')
        })
    }

    handleTextChange = async ({prop, val}) => {

        clearTimeout(this._timeout)

        await this.setState({[prop]: val})

        this._timeout = setTimeout(async ()=> {
            let isAvailable
            if(prop === 'username'){
                isAvailable = await this.checkUserName()
                await this.setState({ username_available: isAvailable })
                if(isAvailable){
                    let updated = await this.updateUser()
                    if(updated.status === 200){
                        let update = Object.assign({}, this.state)
                        delete update.username_available
                        console.log({update})
                        this.props.userData(update)
                    }
                }
            } else {
                let update = this.state
                delete update.username_available
                this.props.userData(update)
            }
        }, 300)

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.fillAndCenter}>
                    <Icon name="cog" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 20}}>
                        Settings
                    </Text>
                    <View style={{position: 'relative'}}>
                        {   // Show icon for username validation
                            this.state.username && this.state.username_available !== null ?
                            (this.state.username_available ?
                                <Icon style={[styles.verify, styles.success]} name="check" />
                                :
                                <Icon style={[styles.verify, styles.fail]} name="exclamation-circle" />) 
                                : null
                        }
                        {
                        this.state.username ? 
                            <Text style={{
                                position: 'relative',
                                paddingLeft: 7,
                                width: Dimensions.get('window').width - 20,
                                alignSelf: 'center'
                            }}>@{
                                    this.state.username
                                        .replace(/ /g, '_')
                                        .replace(/[^\w\s]/gi, '')
                                        .toLowerCase()
                            }</Text> : <Text> </Text>
                        }
                    </View>
                    <TxtInput 
                        id="username"
                        placeholder={ this.state.username || 'username'}
                        onChange={this.handleTextChange}
                        styles={styles.input}
                    />
                    <TxtInput 
                        id="email"
                        placeholder={ this.state.email || this.state.facebook.email || 'email not found'}
                        onChange={this.handleTextChange}
                        styles={styles.input}
                        editable={false}
                    />
                    <TouchableOpacity>
                        <Btn
                            text={'logout'}
                            styles={{
                                borderRadius: 20,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                            onPress={this.logUserOut}
                        />
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

const styles = StyleSheet.create({
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    input: {
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1,
        paddingLeft: 0,
        borderRadius: 0,
        marginBottom: 10,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    verify:{
        position: 'absolute',
        top: 15,
        left: 5,
    },
    success: {
        position: 'relative',
        color: '#0a0',
    },
    fail: {
        position: 'relative',
        color: '#a00',
    }
})

