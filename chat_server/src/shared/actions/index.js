import * as testActions from './test'
import * as userActions from './user'
import * as socketActions from './socket'

export const ActionCreators = Object.assign({},
	testActions,
	userActions,
	socketActions
)