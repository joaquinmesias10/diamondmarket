import {ADD_CART, SHOW_ALERT} from '../constants/action-types';

export const foundDuplicatedCart = ({getState, dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type == ADD_CART)
            {   
                // get current store's state
                const state = getState()
                if(action.payload.type != 'student' &&  state.cartReducer.cart.student != null && state.cartReducer.cart.student.length > 0) {
                    return dispatch({type : SHOW_ALERT, payload : {type : 'warning', msg : 'You can not select more! Student Lunch Box foods already exists in your cart!'}})
                }
                else if(action.payload.type != 'office' && state.cartReducer.cart.office != null && state.cartReducer.cart.office.length > 0) {
                    return dispatch({type : SHOW_ALERT, payload : {type : 'warning', msg : 'You can not select more! Office Lunch Box foods already exists in your cart!'}})
                }
                else if(action.payload.type != 'ready' && state.cartReducer.cart.ready != null && state.cartReducer.cart.ready.length > 0) {
                    return dispatch({type : SHOW_ALERT, payload : {type : 'warning', msg : 'You can not select more! Your cart is not empty! '}})
                }
                else {
                    dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'Your cart is updated!'}})
                }
            }
            return next(action)
        }   
    }
}