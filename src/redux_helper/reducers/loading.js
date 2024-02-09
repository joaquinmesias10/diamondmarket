import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, DISMISS_ALERT} from '../constants/action-types';

const initialState = {
    loading : false, 
    msg : '',
    alert_obj : {
        type : 'success',
        msg : ''
    },
}

const LoadingReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SHOW_LOAD :
            return {loading : true, msg : action.payload}
        case DISMISS_LOAD :
            return {loading : false, msg : ''}
        case SHOW_ALERT :
            return {alert_obj : action.payload}
        case DISMISS_ALERT :
            return {alert_obj : { type : 'success', msg : '' }}
        default :
            return state
    }
}

export default LoadingReducer;