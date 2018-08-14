import React, { Component } from 'react'
import { SafeAreaView as View, StyleSheet, Text, Button } from 'react-native'

import { createStackNavigator  } from 'react-navigation';

class Profile extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={globalStyles.fillAndCenter}>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        My Profile
                    </Text>
                    <Button title="Settings" onPress={() => this.props.navigation.navigate('Settings')} />
                </View>
            </View>
        )
    }
}

class Settings extends Component {
    componentDidMount(){
        console.log('settings component!', this.props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={globalStyles.fillAndCenter}>
                    <Button title={'Sign Out'} style={{textAlign: 'center'}} onPress={()=>this.props.screenProps.handleSignOut()}/>
                    <Button onPress={() => this.props.navigation.navigate('Profile') } title={'Go Back'}/>
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
        Settings: {
            screen: Settings,
        },
    },
    {
        headerMode: 'none',
    }
)


export default ProfileContainer

const globalStyles = StyleSheet.create({
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})

