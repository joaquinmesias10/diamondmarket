import {SET_ALL_ORDERS } from '../constants/action-types';

const initialState = {
    all_orders : null
}

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_ORDERS:
            return Object.assign({}, state, {
                all_orders: action.payload || []
            })
        default:
            return state
    }
}

export default OrdersReducer;