import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Btn extends Component<{}> {
    render() {
        return (
             <TouchableOpacity onPress={this.props.onPress} style={[styles.wrap, this.props.styles]}>
                 { this.props.iconFont && <Icon name={this.props.iconFont} style={[styles.text, {marginRight: 10, fontSize: 20, color: this.props.styles && this.props.styles.color ? this.props.styles.color : '#fff'}]}/> }
                 <Text style={[styles.text, {color: this.props.styles && this.props.styles.color ? this.props.styles.color : '#fff'}]}>{this.props.text}</Text>
             </TouchableOpacity>
        )
    }
}

export default Btn

const styles = StyleSheet.create({
    wrap: {
        width: 260,
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