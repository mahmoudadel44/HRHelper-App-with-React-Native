import * as actions from '../../constants'
const initialState = {
    cand: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_CAND_SUCCESS:
            return {
                ...state,
                cand: [
                    ...state.cand,
                    action.payload,
                ]
            }

        case actions.DELETE_CAND_SUCCESS:
            return {
                ...state,
                cand: state.cand.filter(cand => cand.id !== action.payload)
            }



        case actions.DELETE_ALL_CAND_SUCCESS:
            return {
                cand: []
            }

        default:
            return state
    }
}