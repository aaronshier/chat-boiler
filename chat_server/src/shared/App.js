import React, { Component } from 'react'
import routes from './routes'
import { Route, Switch, withRouter } from 'react-router-dom'
import NotFound from './containers/NotFound'
import NavBar from './components/NavBar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './actions/index'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SocketHandler from './components/SocketHandler';

class App extends Component {
	constructor(props) {
		super(props)
		  
		let member
		if (__isBrowser__){
			member = window.__USER_DATA__
			delete window.__USER_DATA__
		} else {
			member = this.props.member
		}
		if(member){
			member.login = true
		} else {
			member = { login: false }
		}
		this.props.userData(member)
	}
	render(){
		return (
			<div style={{flex: 1, height: '100%'}}>
				<NavBar/>
				{ this.props.redux.user._id && __isBrowser__ && <SocketHandler />}
				<Switch>
					{
						routes.map( ({path, exact, component: C, ...rest }) => (
							<Route key={path} path={path} exact={exact} render={(props) => (
								<C {...props} {...rest} /> )}
							/>
						))
					}
					<Route render={(props) => <NotFound {...props} /> } />
				</Switch>
			</div>
		)
	}
}

function mapStateToProps(redux) {
    return {
        redux
    };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))