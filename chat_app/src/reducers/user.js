import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
	login: false
},{
	[types.USER_DATA](state, action){
		let newState = Object.assign({}, action.payload)
		return newState
	}
})