import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
//REDUX
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../shared/reducers'

import { MUIDemoTheme, server } from '../config'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from '../shared/App'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const store = createStore(reducers, preloadedState)

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
  }
}

hydrate(
    <MuiThemeProvider theme={createMuiTheme(MUIDemoTheme)}>
      <Main />
    </MuiThemeProvider>,
	document.getElementById('app')
)