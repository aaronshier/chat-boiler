import * as types from './types'

export function siteLoaded( loaded ) {
	return {
		type: types.SITE_LOADED,
		payload: loaded
	}
}