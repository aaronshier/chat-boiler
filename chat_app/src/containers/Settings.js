import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ActionCreators } from '../actions/index'

import Icon from 'react-native-vector-icons/FontAwesome'

class Settings extends Component {
    componentDidMount(){
        console.log('settings component!', this.props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.fillAndCenter}>
                    <Icon name="cog" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Profile
                    </Text>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

const styles = StyleSheet.create({
    fillSpace: {
        flex: 1
    },
    fillAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})

