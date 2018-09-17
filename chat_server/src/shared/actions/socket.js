import * as types from './types'

export function loadSocket( socket ) {
	return {
		type: types.SOCKET,
		payload: socket
	}
}

export function incomingGlobalChat( message ) {
	return {
		type: types.GLOBAL_CHAT,
		payload: message
	}
}