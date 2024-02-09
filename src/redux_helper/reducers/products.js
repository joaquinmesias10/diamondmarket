import {SET_ALL_PRODUCTS, SET_STUDENT_LUNCHBOX, SET_OFFICE_LUNCHBOX, SET_READY_HEAT, SET_READY_COOK,
    SET_READY_EAT, SET_READY_DRINK, SET_PROMO, SET_ALL_CATEGORY,
} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    all_cats : null,
    all_products : null,
    student_lunch_box : null,
    office_lunch_box : null,
    ready_heat : null,
    ready_cook : null,
    ready_eat : null,
    ready_drink : null,
    promo_products : null,
}

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PRODUCTS:
            return Object.assign({}, state, {
                all_products: action.payload || []
            })
        case SET_STUDENT_LUNCHBOX : {
            return Object.assign({}, state, {
                student_lunch_box: action.payload || []
            })
        }
        case SET_OFFICE_LUNCHBOX : {
            return Object.assign({}, state, {
                office_lunch_box: action.payload || []
            })
        }
        case SET_READY_HEAT : {
            return Object.assign({}, state, {
                ready_heat: action.payload || []
            })
        }
        case SET_READY_COOK : {
            return Object.assign({}, state, {
                ready_cook: action.payload || []
            })
        }
        case SET_READY_EAT : {
            return Object.assign({}, state, {
                ready_eat: action.payload || []
            })
        }
        case SET_READY_DRINK : {
            return Object.assign({}, state, {
                ready_drink: action.payload || []
            })
        }
        case SET_PROMO : {
            return Object.assign({}, state, {
                promo_products: action.payload || []
            })
        }
        case SET_ALL_CATEGORY : {
            return Object.assign({}, state, {
                all_cats: action.payload || []
            })
        }
        default:
            return state
    }
}

export default ProductsReducer;