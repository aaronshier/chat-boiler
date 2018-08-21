import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import ImagePicker from 'react-native-image-crop-picker';

class AddMedia extends Component<{}> {
    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          }).catch(e => {
              console.log(e)
          })
          
    }
    openLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          }).catch(e => {
            console.log(e)
        })
    }
    render() {
        return (
            <View style={styles.sections}>
                <TouchableOpacity style={styles.buttons} onPress={this.openCamera}>
                    <Icon name="camera" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                <TouchableOpacity style={styles.buttons} onPress={this.openLibrary}>
                    <Icon name="image" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Library
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