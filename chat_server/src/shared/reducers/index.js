import { combineReducers } from 'redux'
import * as testReducer from './test'
import * as userReduce from './user'
import * as globals from './global'

export default combineReducers(Object.assign(
	testReducer,
	userReduce,
	globals,
))