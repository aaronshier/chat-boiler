import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const socket = createReducer({
	login: false
},{
	[types.SOCKET](state, action){
		return action.payload
	}
})