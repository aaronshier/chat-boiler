import React, { Component } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class TxtInput extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {}
    }
    handleChange = (e) => {// console.log({prop: this.props.id, val: e})
    this.setState({text: e})    
    this.props.onChange({ prop : this.props.id, val: e})

    }
    render() {
        return (
            <View style={{width: 260, alignSelf: 'center', position: 'relative'}}>
                { this.props.icon && <Icon style={[styles.icon, {opacity: this.state.text ? 1 : .6}]} name={this.props.icon}/> }
                <TextInput
                    style={[styles.input, {paddingLeft: this.props.icon ? 30 : 0}, this.props.styles]}
                    placeholder={this.props.placeholder}
                    onChangeText={this.handleChange}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    autoCapitalize={this.props.autoCapitalize}
                />
            </View>
        )
    }
}

export default TxtInput

const styles = StyleSheet.create({
    input: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        width: 260,
        fontSize: 16
    },
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 18
    }
})