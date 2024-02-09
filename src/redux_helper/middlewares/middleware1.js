import {ADD_CART, ADD_FAV} from '../constants/action-types';

export const foundDuplicatedFavs = ({getState, dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type == ADD_FAV)
            {   
                // get current store's state
                const state = getState()
                const found = state.favoriteReducer.favs.filter(item => item == action.payload)
                if(found.length) {
                    return dispatch({type : 'FOUND_Duplicate_Fav'})
                }
            }
            return next(action)
        }   
    }
}

