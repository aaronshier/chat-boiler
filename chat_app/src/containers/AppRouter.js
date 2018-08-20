import React from 'react';
import { createBottomTabNavigator  } from 'react-navigation';
import Home from './Home'
import Chat from './Chat'
import AddMedia from './AddMedia'
import Profile from './Profile'
import Settings from './Settings'

import Icon from 'react-native-vector-icons/FontAwesome';


const iconStyle = (tint) => {
  return {fontSize: 24, color: tint}
}

const PrimaryApp = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        selectedIconColor: '#f00',
        tabBarIcon: ({ tintColor }) => <Icon style={[iconStyle(tintColor)]} name="home" />
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        selectedIconColor: '#f00',
        tabBarIcon: ({ tintColor }) => <Icon style={[iconStyle(tintColor)]} name="comments" />
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
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Icon style={iconStyle(tintColor)} name="cog" />
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