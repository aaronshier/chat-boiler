import Home from './containers/Home'
import { fetchDemoData } from './services/outbound'
import Login from './containers/Login'
import Signup from './containers/Signup'
import TestApi from './containers/TestApi'
import Transitions from './containers/Transitions'

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		title: 'SSR Home Page'
	},
	{
		path: '/trans',
		exact: true,
		component: Transitions,
		title: 'Transitions Test'
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		title: 'Login to your HERMN account'
	},
	{
		path: '/signup',
		exact: true,
		component: Signup,
		title: 'Register for a HERMN Account'
	},
	{
		path: '/test/:id',
		component: TestApi,
		wildcard: true,
		title: 'Results for {{id}}',
		fetchInitialData: (path = '') => fetchDemoData(path.split('/').pop()),
	}
]

export default routes

export const getTitle = ()=>{
	let url = window.location.href
		url = url.substring(0, url.indexOf('?', ''))
		url = url.replace('#', '')
	let pagePath = '/'+url.split('/').pop()
	console.log(pagePath)
	document.title = routes.find(x => x.path === pagePath).title
}