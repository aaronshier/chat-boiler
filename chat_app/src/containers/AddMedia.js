import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'

class AddMedia extends Component<{}> {
    render() {
        return (
            <View style={styles.sections}>
                <TouchableOpacity style={styles.buttons}>
                    <Icon name="camera" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                <TouchableOpacity style={styles.buttons}>
                    <Icon name="image" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Camera
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedia)

const styles = StyleSheet.create({
    sections: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '90%',
        height: 2,
        backgroundColor: '#eee'
    }
})