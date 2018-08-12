import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { getTitle }from '../routes'

class Home extends Component {
	constructor(props){
	  super(props);
	
	  this.state = {};
	}
	componentDidMount(){
		getTitle()
	}
	render(){
		return (
				<div style={styles.home_wrap}>
					<div style={{padding: '20px'}}>
						<div style={{padding: '20px', maxWidth: 500, background: '#f6f6f6', clear: 'both'}}>
							<h1 style={{fontSize: 60, margin: '0 0 20px', textAlign: 'center'}}>HERMN SSR</h1>
							<h2 style={{margin: 0, textAlign: 'center', margin: '0 0 20px'}}>Welcome to HU$H's MERN Stack...</h2>
							<p style={{margin: 0, textAlign: 'center'}}>This stack comes packaged with Reactjs, Expressjs, MongoDB, and some handy integrations including server side rendering with react router v4, local signup, 'Log In With Google' using Passportjs, and Googles Material UI design framework</p>					
						</div>
						<div style={{padding: '20px', maxWidth: 500, marginTop: 20, background: '#f6f6f6' }}>
							<p><strong>To get you started,</strong> this baseline theme has user <Link to="/signup" style={{color: '#0af'}}>signup</Link> and <Link to="/login" style={{color: '#0af'}}>login</Link> pages, as well as an example using isomorphic-fetch to render data from the self contained api. Its also setup up fully mobile responsive with a drawer menu below 590px</p>
						</div>
					</div>
				</div>
		)
	}
}

export default Home

const styles = {
	home_wrap: {
		display: 'flex',
		minHeight: 'calc(100% - 200px)',
		justifyContent: 'center',
		alignItems: 'center',
	}
}