import * as testActions from './test'
import * as userActions from './user'
import * as globalActions from './global'

export const ActionCreators = Object.assign({},
	testActions,
	userActions,
	globalActions,
)