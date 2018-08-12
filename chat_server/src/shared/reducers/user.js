import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({signin: false},{
	[types.USER_DATA](state, action){
		let newState = action.payload
		return newState
	}
})