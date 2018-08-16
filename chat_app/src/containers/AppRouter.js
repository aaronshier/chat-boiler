import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import Home from './Home'
import AddMedia from './AddMedia'
import Profile from './Profile'

import Icon from 'react-native-vector-icons/FontAwesome';


const iconStyle = (tint) => {
  return {fontSize: 25, color: tint}
}

const PrimaryApp = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        selectedIconColor: '#f00',
        tabBarIcon: ({ tintColor }) => <Icon style={[iconStyle(tintColor), {fontSize: 32}]} name="home" />
      }
    },
    AddMedia: {
      screen: AddMedia,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Icon style={iconStyle(tintColor)} name="camera" />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Icon style={iconStyle(tintColor)} name="user" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true
    },
    mode: 'modal'
  }
)

export default PrimaryApp