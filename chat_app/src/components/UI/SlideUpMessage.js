import React from 'react';
import { Animated, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class SlideUpMessage extends React.Component {
  constructor(props){
    super(props)
  
    this.state = {
      slidein: new Animated.Value(-100),  // Initial value for opacity: 0
      opacity: new Animated.Value(0),
      cycleCompleted: true
    }
  }
  
  openMessage = (message) => {
    if(this.state.cycleCompleted){
      this.setState({message, cycleCompleted: false}, 
        ()=>{
          Animated.timing(                  // Animate over time
            this.state.slidein,            // The animated value to drive
            {
              toValue: 20,                   // Animate to opacity: 1 (opaque)
              duration: 500,              // Make it take a while
            }
          ).start()
          Animated.timing(                  // Animate over time
            this.state.opacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 700,              // Make it take a while
            }
          ).start()
          setTimeout(()=>{
            this.closeMessage()
          },this.props.timer || 2000)
      })
    }
  }

  closeMessage = () => {
    Animated.timing(                  // Animate over time
      this.state.slidein,            // The animated value to drive
      {
        toValue: -100,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start()
    Animated.timing(                  // Animate over time
      this.state.opacity,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start()
    setTimeout(()=>{
      this.setState({cycleCompleted: true})
    }, 500)
  }

  render() {
    let { opacity, message, slidein } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          opacity: opacity,  
          bottom: slidein,
          ...styles.outter
        }}
      >
        <TouchableOpacity style={{
          ...this.props.styles,
          ...styles.wrap
        }} onPress={this.closeMessage}>
          <Text style={styles.text}>{message || 'error'}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  outter: {
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrap:{
    backgroundColor: '#222',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    padding: 20
  },
  text: {
    color: '#fff',
    fontSize: 18
  }
})