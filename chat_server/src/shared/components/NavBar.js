import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'
import Button from '@material-ui/core/Button';

  const navBarLoggedOut = [{
    url: '/',
    name: 'Home'
  },
  {
    url: '/trans',
    name: 'Transitions'
  },
  {
    url: '/login',
    name: 'Log In'
  },
  {
    url: '/signup',
    name: 'Register'
  }]

  const navBarLoggedIn = [{
    url: '/',
    name: 'Home'
  },
  {
    url: '/test/page1',
    name: 'Page 1'
  },
  {
    url: '/test/page2',
    name: 'Page 2'
  },
  {
    url: '/test/page3',
    name: 'Page 3'
  }]

class NavBar extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {user} = this.props.state
    const navigation = user.loggedIn ? navBarLoggedIn : navBarLoggedOut
    return (
        <div className="navbar">
          <h1 style={{fontSize: 80}}>HERMN SSR 1.0</h1>
          <ul style={{position: 'absolute', bottom: 0, right: 0}}>
            {navigation.map(({ name, url }, key) => (
              <NavLink key={key} activeStyle={{fontWeight: 'bold'}} to={url}>
                <Button style={{color: '#fff'}}>
                  {name}
                </Button>
              </ NavLink>
            ))}
            { user.loggedIn && (<a href="/logout"><Button style={{color: '#fff'}}>Log Out</Button></a>) }
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
