import * as types from './types'

export function userData( userData ) {
	return {
		type: types.USER_DATA,
		payload: userData
	}
}

export function loginFields( userData ) {
	return {
		type: types.USER_LOGIN_FIELDS,
		payload: userData
	}
}