import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Main from './src/containers/Main'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})



