import {SET_USER, GET_USER, LOGOUT, SET_USER_PROFILE} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    user : '',
    user_profile : {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {
                user: _localstorage.getItem('user') || ''
            })
        case SET_USER:
            _localstorage.setItem('user', action.payload)
            return Object.assign({}, state, {
                user : action.payload || ''
            })
        case LOGOUT:
            _localstorage.removeItem('user')
            return { user : '', user_profile : {}}
        case SET_USER_PROFILE :
            return Object.assign({}, state, {
                user_profile : action.payload || {}
            })
        default:
            return state
    }
}

export default userReducer;