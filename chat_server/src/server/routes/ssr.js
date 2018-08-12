import express from 'express'
import { renderToString } from 'react-dom/server'
import App from '../../shared/App'
import React from 'react'
import serialize from 'serialize-javascript'
import { StaticRouter, matchPath } from 'react-router-dom'
import routes from '../../shared/routes'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../../shared/reducers'

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { production, MUIDemoTheme, server } from '../../config'

import {
	MuiThemeProvider,
	createMuiTheme,
	createGenerateClassName,
  } from '@material-ui/core/styles';

const app = express()

function userStatus(req, res, next) {
  if (req.isAuthenticated())
      return true
  else 
      return false
}

const devTools = production ? '' : '<script src="http://localhost:8097"></script>'

app.get('*', (req, res, next) => {
	
	//CSS CREATION
  	const sheetsRegistry = new SheetsRegistry();

	//ROUTE DETECTION
	const activeRoute = routes.find( (route) => matchPath(req.url, route) ) || {}
	
	const promise = activeRoute.fetchInitialData
		? activeRoute.fetchInitialData(req.path)
		: Promise.resolve()

  	const store = createStore(reducers)

  	const userData = userStatus(req, res, next)
  	? { user: req.user, loggedIn: true}
  	: { user: null, loggedIn: false}

	promise.then( (data) => {
		const context = {}
		context.repos = data
		context.member = userData
		
		const title = activeRoute.wildcard  ? 
			activeRoute.title.replace('{{id}}', req.url.split('/').pop())
		: 	activeRoute.title

		const documentMeta = {
			title,
		}
		const sheetsManager = new Map();

		const generateClassName = createGenerateClassName();

		const markup = renderToString(
		    <JssProvider classNamePrefix={'hermn-app'} registry={sheetsRegistry} generateClassName={generateClassName}>
				<MuiThemeProvider theme={createMuiTheme(MUIDemoTheme)} sheetsManager={sheetsManager}>
					<Provider store={store}>
						<StaticRouter location={req.url} context={context}>
							<App member={userData}/>
						</StaticRouter>
					</Provider>
				</MuiThemeProvider>
		    </JssProvider>
		)

	  // Grab the CSS from our sheetsRegistry.
	  const css = sheetsRegistry.toString()

	  // Grab the initial state from our Redux store
	  const preloadedState = store.getState()

		res.send(`
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1">` + devTools +
					`<title>${documentMeta.title}</title>
					<script>
					window.__INITIAL_DATA__ = ${serialize(data)}
					window.__USER_DATA__ = ${serialize(userData)}
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
					</script>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
					<link rel="stylesheet" type="text/css" href="/css/style.min.css">
					<style>

						html, body, #app, #app>div {
							height: 100%
						}


						.fadeSlide-appear {
							opacity: 0.01;
							position: relative;
							transform: translateX(-100px);
						}
						
						.fadeSlide-appear.fadeSlide-appear-active {
							opacity: 1;
							transform: translateX(0px);
							transition: all .5s ease-in-out;
						}

						.fadeSlide-leave {
							opacity: 1;
							transform: translateX(0px);
						}
						
						.fadeSlide-leave.fadeSlide-leave-active {
							opacity: 0.01;
							transform: translateX(100px);
							transition: all 300ms ease-in;
						}



						.fade-appear {
							opacity: 0.01;
						}
						
						.fade-appear.fade-appear-active {
							opacity: 1;
							transition: opacity 500ms ease-in;
						}
						
						.fade-leave {
							opacity: 1;
						}
						
						.fade-leave.fade-leave-active {
							opacity: 0.01;
							transition: opacity 300ms ease-in;
						}

					</style>
				</head>
				<body id="body_view">
					<div id="app" style="flex: 1;">${markup}</div>
					<style id="jss-server-side">${css}</style>
					<script src="/bundle.production.min.js" type="text/javascript"></script>
				</body>
			</html>
		`)
	}).catch(next)
})

module.exports = app
