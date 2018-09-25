import * as types from './types'

export function loadSocket( socket ) {
	return {
		type: types.SOCKET,
		payload: socket
	}
}

export function incomingGlobalChat( message ) {
	console.log('running incoming global chat message')
	return {
		type: types.GLOBAL_CHAT,
		payload: message
	}
}