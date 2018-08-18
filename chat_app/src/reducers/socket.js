import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const socket = createReducer({},{
	[types.SOCKET](state, action){
		return action.payload
	}
})

export const global_messages = createReducer([],{
	[types.GLOBAL_CHAT](state, action){
		let newPayload = [...state, action.payload]
		return newPayload
	}
})