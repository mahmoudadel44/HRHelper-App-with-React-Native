import * as actions from '../constants'
let candID = 0;
export const addCand = (myCand) => {
    return {
        type: actions.ADD_CAND_SUCCESS,
        id: candID++,
        payload: { myCand, id: candID }
    }

}

export const deleteCand = (id) => {
    return {
        type: actions.DELETE_CAND_SUCCESS,
        payload: id
    }

}


export const deleteAllCands = () => {
    return {
        type: actions.DELETE_ALL_CAND_SUCCESS,
    }
}
