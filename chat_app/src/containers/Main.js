import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FBAutoLogin from '../components/FBSDK/FBAutoLogin'
import FBLoginButton from '../components/FBSDK/FBLoginButton'
import FBShareDialog from '../components/FBSDK/FBShareDialog'

class Main extends Component<{}> {
    componentDidMount(){
        FBAutoLogin()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    This is living...
                </Text>
                <FBLoginButton />
                <FBShareDialog />
            </View>
        )
    }
}

export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  })