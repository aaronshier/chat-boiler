import * as types from './types'

export function userData( userData ) {
	return {
		type: types.USER_DATA,
		payload: userData
	}
}