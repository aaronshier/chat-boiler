import { combineReducers } from 'redux'
import * as testReducer from './test'
import * as userReduce from './user'
import * as socket from './socket'

export default combineReducers(Object.assign(
	testReducer,
	userReduce,
	socket
))