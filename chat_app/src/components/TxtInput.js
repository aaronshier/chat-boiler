import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

class TxtInput extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {}
    }
    handleChange = (e) => {// console.log({prop: this.props.id, val: e})
        this.props.onChange({ prop : this.props.id, val: e})
    }
    render() {
        return (
            <TextInput
                style={[styles.input, this.props.styles]}
                placeholder={this.props.placeholder}
                onChangeText={this.handleChange}
                autoCapitalize={this.props.autoCapitalize}
            />
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
    }
})