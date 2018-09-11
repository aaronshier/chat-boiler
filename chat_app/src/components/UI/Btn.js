import React, { Component } from 'react'
import { Text, Keyboard, Button, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'


class Btn extends Component<{}> {
    
    constructor(props){
        super(props)
    
        this.state = {}

        this.spinValue = new Animated.Value(0)

        Animated.loop( 
            Animated.timing(
                this.spinValue, 
                { 
                    toValue: 360,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start()
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
        })

        const RotatingIcon = Animated.createAnimatedComponent(Icon)

        const styles = StyleSheet.create({
            wrap: {
                width: this.props.styles && this.props.styles.width ? this.props.styles.width : 260,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 2,
                justifyContent: 'center',
                backgroundColor: '#333'
            },
            text: {
                fontWeight: '900',
                fontSize: 16
            }
        
        })
        return (
             <TouchableOpacity
                onPress={()=>{
                    this.props.dismissKeyboardOnPress && Keyboard.dismiss()
                    this.props.onPress()
                 }} style={[
                     styles.wrap,
                     this.props.styles,
                     { opacity: this.props.disable ? .2 : 1}]}>
                 { this.props.iconFont && <Icon name={this.props.iconFont} style={[styles.text, {marginRight: 10, fontSize: 20, color: this.props.styles && this.props.styles.color ? this.props.styles.color : '#fff'}]}/> }
                { !this.props.loading ? 
                    <Text style={[styles.text, {color: this.props.styles && this.props.styles.color ? this.props.styles.color : '#fff'}]}>
                        {this.props.text}
                    </Text> 
                    : 
                    <RotatingIcon name={'spinner'} style={[
                        styles.text,
                        {
                            marginRight: 10,
                            fontSize: 20,
                            color: this.props.styles && this.props.styles.color ? this.props.styles.color : '#fff'
                        },
                        {
                            transform: [{
                                rotate: spin
                            }] 
                        }
                        ]}
                    /> 
                }
             </TouchableOpacity>
        )
    }
}

export default Btn
