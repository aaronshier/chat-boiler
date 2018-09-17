import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, KeyboardAvoidingView, Platform } from 'react-native'
import TxtInput from '../TxtInput'
import Btn from '../UI/Btn'
import { server, status_codes } from '../../config'

import {
    CachedImage as Image,
} from 'react-native-cached-image';

class FBSignUpUserName extends Component<{}> {
    constructor(props){
        super(props)
      
        this.state = {
          waiting: false,
          slidein: new Animated.Value(-100),  // Initial value for opacity: 0
          opacity: new Animated.Value(0),
          cycleCompleted: true,
          zIndex: -1
        }
    }

    open = (user) => {
        if(this.state.cycleCompleted){
          this.setState({user, zIndex: 99999, cycleCompleted: false}, 
            ()=>{
              Animated.timing(                  // Animate over time
                this.state.slidein,            // The animated value to drive
                {
                  toValue: 20,                   // Animate to opacity: 1 (opaque)
                  duration: 500,              // Make it take a while
                }
              ).start()
              Animated.timing(                  // Animate over time
                this.state.opacity,            // The animated value to drive
                {
                  toValue: 1,                   // Animate to opacity: 1 (opaque)
                  duration: 700,              // Make it take a while
                }
              ).start()
          })
        }
    }
    
    close = () => {
        Animated.timing(                  // Animate over time
        this.state.slidein,            // The animated value to drive
            {
                toValue: -100,                   // Animate to opacity: 1 (opaque)
                duration: 500,              // Make it take a while
            }
        ).start()
        Animated.timing(                  // Animate over time
        this.state.opacity,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 300,              // Make it take a while
            }
        ).start()
        setTimeout(()=>{
            this.props.finishSignUpAndLogin(this.state.user)
            this.setState({ zIndex: -1, cycleCompleted: true })
        }, 500)
    }

    handleUsernameChange = ({ prop, val}) => {
        fetch(`${server}/api/check-username`, {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${this.state.user.token}`
            },
            body: JSON.stringify({username: val})
        }).then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.status === status_codes.OK){
                this.setState({username: response.username, available: response.nameAvailable})
            } else {
                this.setState({error: response.status})
            }
        })
    }

    handleSubmitUserName = () => {
        if(this.state.available){
            this.setState({waiting: true})
            fetch(`${server}/api/mobile/update-username`, {
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json',
                    'Authorization': `JWT ${this.state.user.token}`
                },
                body: JSON.stringify({username: this.state.username})
            }).then(res => res.json())
            .then(response => {
                if(response.status === status_codes.OK &&
                    response.update.nModified === 1){
                    this.setState({username_added: true})
                    this.close()
                } else {
                    this.setState({error: response.status})
                }
            })
        }
    }

    render() {
        let { opacity, user, zIndex, slidein } = this.state;
        const offset = (Platform.OS === 'android') ? -200 : 0;
        return (
            <Animated.View                 // Special animatable View
                style={{
                ...this.props.styles,
                opacity: opacity,  
                bottom: slidein,
                ...styles.wrap,
                zIndex
                }}
            >
            {user &&
                <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={offset}
                        style={styles.popup}
                        enabled
                >
                    <View>
                        <Image style={styles.avatar} source={{uri: user.avatar}} />
                        <Text style={styles.text}>Welcome {user.facebook.name.split(' ')[0]}!</Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>Last thing you need is a username!</Text>
                        <TxtInput
                            placeholder={"Enter a unique username"}
                            keyboardType={'email-address'}
                            icon={'at'}
                            onChange={this.handleUsernameChange}
                            styles={{alignSelf: 'center'}} />
                        <Btn
                            loading={this.state.waiting}
                            styles={{
                                backgroundColor: '#3B5998',
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                            text={'SUBMIT'}
                            onPress={this.handleSubmitUserName} />
                    </View>
                </KeyboardAvoidingView>
            }
            </Animated.View>
        )
    }
}

export default FBSignUpUserName

const styles = StyleSheet.create({
    wrap: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        padding: 10
    },
    popup: {
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center'
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginBottom: 20
    },
    text: {
        textAlign: 'center'
    }
})