import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class NotFound extends Component<{}> {
  render() {
    return (
      <div style={styles.wrap}>
        <h1 style={styles.title}>404... This page was not found!</h1>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)

const styles = {
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    margin: 0,
    textAlign: 'center'
  }
}