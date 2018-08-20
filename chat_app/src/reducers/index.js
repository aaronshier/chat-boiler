import { combineReducers } from 'redux'
import * as user from './user'
import * as socket from './socket'

export default combineReducers(Object.assign(
	user,
	socket,
))