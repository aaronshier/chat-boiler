import * as userActions from './user'
import * as socket from './socket'

export const ActionCreators = Object.assign({},
	userActions,
	socket,
)