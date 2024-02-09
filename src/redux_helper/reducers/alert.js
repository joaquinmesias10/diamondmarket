import {SHOW_ALERT, DISMISS_ALERT} from '../constants/action-types';

const initialState = {
    type : 'success',
    msg : ''
}

const AlertReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SHOW_ALERT :
            return action.payload
        case DISMISS_ALERT :
            return { type : 'success', msg : '' }
        default :
            return state
    }
}

export default AlertReducer;