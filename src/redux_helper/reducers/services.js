import {SET_ALL_SERVICE_CATEGORY,} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    all_service_cats : null,
}

const ServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_SERVICE_CATEGORY : {
            return Object.assign({}, state, {
                all_service_cats: action.payload || []
            })
        }
        default:
            return state
    }
}

export default ServicesReducer;