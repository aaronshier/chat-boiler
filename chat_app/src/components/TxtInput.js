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
            <View style={[
                this.props.styles && this.props.styles.width ? 
                    { width: this.props.styles.width } 
                        :
                    { width: '100%' },
                { alignSelf: 'center', position: 'relative', alignItems: 'center' }
            ]}>
                { this.props.icon && <Icon style={[
                        styles.icon,
                        { opacity: this.state.text ? 1 : .6}
                    ]} name={this.props.icon}
                /> }
                <TextInput
                    style={[
                        styles.input,
                        this.props.styles,
                        { 
                            paddingLeft: this.props.styles && this.props.styles.paddingLeft ? 
                                this.props.styles.paddingLeft 
                            : 
                                (this.props.icon ? 30 : 0)}
                    ]}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={'rgba(0, 0, 0, 0.8)'}
                    onChangeText={this.handleChange}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    autoCapitalize={this.props.autoCapitalize}
                    secureTextEntry={this.props.secureTextEntry}
                    textContentType={this.props.textContentType}
                    keyboardType={this.props.keyboardType}
                    editable={this.props.editable}
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
        borderColor: 'rgba(0,0,0,.5)',
        width: 260,
        fontSize: 16,
        borderRadius: 5,
    },
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 18
    }
})