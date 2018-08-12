import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const site_loaded = createReducer(false,{
	[types.SITE_LOADED](state, action){
		let newState = action.payload
		return newState
	}
})