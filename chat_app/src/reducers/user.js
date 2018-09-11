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

export const login_creds = createReducer({
	username: '',
	email: '',
	password: ''
},{
	[types.USER_LOGIN_FIELDS](state, action){
		let newState = Object.assign({}, action.payload)
		return newState
	}
})