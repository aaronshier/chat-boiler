import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

// export const addYes = createReducer(0, {
// 	[types.ADD_YES](state, action){
// 		return state + 1;
// 	}
// })

export const test = createReducer([],{
	[types.ADD_TEST](state, action){
		let newState = [ ...state,
			{
				value: action.payload,
				count: state.length + 1
			}
		]
		return newState
	}
})