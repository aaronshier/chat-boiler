import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class GitHub extends Component<{}> {
	
	constructor(props) {

		super(props)

		let repos

		if (__isBrowser__){
			repos = window.__INITIAL_DATA__
			delete window.__INITIAL_DATA__
		} else {
			repos = this.props.staticContext.repos
		}

		this.state = {
			repos,
			loading: repos ? false : true
		}

		this.fetchRepos = this.fetchRepos.bind(this)
		
	}

	componentDidMount() {
		if(!this.state.repos){
			this.fetchRepos(this.props.match.params.id)
		}
	}

	componentDidUpdate(prevState) {
		if(prevState.match.params.id !== this.props.match.params.id){
			this.fetchRepos(this.props.match.params.id)
		}
		
	}

	fetchRepos (lang) {
		this.setState(() => ({
		  loading: true,
		}))

		this.props.fetchInitialData(lang)
		  .then((repos) => this.setState(() => ({
		    repos,
		    loading: false,
		  }))).then(()=> document.title = 'Results for '+this.state.repos.lang)
	}

	render() {

		const { repos, loading } = this.state

		if(loading ===true){
			return <h1>LOADING...</h1>
		}

	    return (
	    	<div style={{padding: '0 20px'}}>
	    		<h1 style={{textAlign: 'center'}}>Welcome to {repos.lang}</h1>
		      	<ul style={{display: 'flex', flexWrap: 'wrap', backgroundColor: '#eee'}}>
		          {
		        	repos.response.map(({ name, owner, stargazers_count, html_url }) => (
			          <li key={name} style={{margin: 30}}>
			            <ul>
			              <li><a href={html_url}>{name}</a></li>
			              <li>{owner}</li>
			              <li>{stargazers_count} stars</li>
			            </ul>
			          </li>
			        ))
		          }
		      	</ul>
	      	</div>
      	)
	}
}

function mapStateToProps(state) {
    return {
        state
    };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);