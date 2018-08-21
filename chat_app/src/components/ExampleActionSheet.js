import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionSheetManager, { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
const checkedIcon = <View />

class ExampleActionSheet extends Component<{}> {
    onItemPress = (e) => {
        alert(`You clicked on ${e}`)
    }
    render() {
        const iconStyles = {
            width: 80,
            alignItems: 'center',
            justifyContent: 'center'
        }
        const actionSheetItems = [
            <ActionSheetItem
              key='item-1'
              text="Github"
              value="github"
              selected={false}
              selectedIcon={checkedIcon}
              icon={
                <View style={iconStyles}><Icon name="github" size={42} /></View>
              }
              onPress={this.onItemPress}
            />,
            <ActionSheetItem
              key='item-2'
              text="Facebook"
              value="facebook"
              selected={false}
              selectedIcon={checkedIcon}
              icon={
                <View style={iconStyles}><Icon name="facebook" color="#4363A2" size={42} /></View>
              }
              onPress={this.onItemPress}
            />,
            <ActionSheetItem
              key='item-3'
              text="Beer"
              value="beer"
              selected={false}
              selectedIcon={checkedIcon}
              icon={
                <View style={iconStyles}><Icon name="beer" color="#794a26" size={42} /></View>
              }
              onPress={this.onItemPress}
            />,
          ];
        const options = {
          defaultValue: ['github'],
          children: actionSheetItems,
          onChange: (value, index, selectedData) => {

          },
        }
        return (
            <View style={{alignSelf: 'center', marginBottom: 10, width: 220}}><Button onPress={() => ActionSheetManager.show(options)} title="Custom Action Sheet" /></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExampleActionSheet)