import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Button } from 'react-native'

import { createStackNavigator  } from 'react-navigation';

import ExampleActionSheet from '../components/ExampleActionSheet';

import Icon from 'react-native-vector-icons/FontAwesome'

import {
    CachedImage,
} from 'react-native-cached-image';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class Profile extends Component {
    componentDidMount(){
        console.log('profile props', this.props)
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.fillAndCenter}>
                { this.props.redux.user.avatar ?
                    <CachedImage 
                        style={{
                            alignSelf: 'center',
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            resizeMode: 'contain'
                        }}
                        source={{uri: this.props.redux.user.avatar}} />
                    :    <Icon name="user" style={{alignSelf: 'center', fontSize: 60}}/>
                }
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Profile
                    </Text>
                    <View style={{alignSelf: 'center', marginBottom: 10, width: 100}}><Button title="Extras" onPress={() => this.props.navigation.navigate('Extra')} /></View>
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


class Extra extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.fillAndCenter}>
                    <Icon name="plus" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Extras
                    </Text>
                    <ExampleActionSheet />
                    <View style={{alignSelf: 'center', marginBottom: 10, width: 100}}><Button title="Back" onPress={() => this.props.navigation.navigate('Profile')} /></View>
                </View>
            </View>
        )
    }
}

const ProfileContainer = createStackNavigator(
    {
        Profile: {
            screen: connect(mapStateToProps, mapDispatchToProps)(Profile),
        },
        Extra: {
            screen: Extra,
        },
    },
    {
        headerMode: 'none',
    }
)

export default ProfileContainer

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

