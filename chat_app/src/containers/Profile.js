import React, { Component } from 'react'
import { SafeAreaView as View, StyleSheet, Text, Button } from 'react-native'

import { createStackNavigator  } from 'react-navigation';

import ExampleActionSheet from '../components/ExampleActionSheet';

import Icon from 'react-native-vector-icons/FontAwesome'

class Profile extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.fillAndCenter}>
                    <Icon name="user" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Profile
                    </Text>
                    <View style={{alignSelf: 'center', marginBottom: 10, width: 100}}><Button title="Extras" onPress={() => this.props.navigation.navigate('Extra')} /></View>
                </View>
            </View>
        )
    }
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
            screen: Profile,
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

