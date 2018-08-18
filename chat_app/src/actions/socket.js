import * as types from './types'

export function loadSocket( socket ) {
	return {
		type: types.SOCKET,
		payload: socket
	}
}