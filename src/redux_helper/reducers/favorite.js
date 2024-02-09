import { SET_FAVS,} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    favs : []
}

const FavoriteReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_FAVS :
            return Object.assign({}, state, {
                favs : action.payload
            })
        default :
            return state
    }
}

export default FavoriteReducer;