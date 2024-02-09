import {SET_CUR_PAGE} from '../constants/action-types';

const initialState = {
    active_page : ''
}

const GlobalReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_CUR_PAGE:
            return Object.assign({}, state, {
                active_page: action.payload || ''
            })
        default :
            return state
    }
}

export default GlobalReducer;