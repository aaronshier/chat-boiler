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
    url: '/profile',
    name: 'Profile'
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

    this.state = {

    }

    this.logout = this.logout.bind(this)
  }
  logout(){
    window.location.href = '/auth/logout'
  }
  render() {
    const { redux } = this.props
    const navigation = redux.user.login ? navBarLoggedIn : navBarLoggedOut
    return (
      <div className="navbar">
        <i style={{
          position: 'absolute',
          left: '40px',
          background: '#fff',
          color: '#0af',
          width: '45px',
          height: '45px',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
        }}class="fas fa-comments"></i>
        <ul style={{position: 'absolute', bottom: 0, right: 0}}>
          {navigation.map(({ name, url }, key) => (
            <NavLink key={key} activeStyle={{fontWeight: 'bold'}} to={url}>
              <Button style={{color: '#fff'}}>
                {name}
              </Button>
            </ NavLink>
          ))}
          { redux.user.login && (<a onClick={this.logout}><Button style={{color: '#fff'}}>Log Out</Button></a>) }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(redux) {
    return {
      redux
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
