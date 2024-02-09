import { SET_ABOUTUS, SET_IMPNOTES, SET_NEWS, SET_DESTINATIONS } from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    about_us: '',
    imp_notes: null,
    news: null,
    destinations: null,
}

const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ABOUTUS:
            return Object.assign({}, state, {
                about_us: action.payload || ''
            })
        case SET_IMPNOTES:
            return Object.assign({}, state, {
                imp_notes: action.payload || {}
            })
        case SET_NEWS:
            return Object.assign({}, state, {
                news: action.payload || []
            })
        case SET_DESTINATIONS: 
            return Object.assign({}, state, {
                destinations: action.payload || []
            })
        default:
            return state
    }
}

export default ContentReducer;