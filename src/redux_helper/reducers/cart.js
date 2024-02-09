import {GET_CART, ADD_CART, RMV_CART, CLEAR_CART, INC_CART, SET_PAY_METHOD, SET_CART_SUMMARY} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    cart : {
        student : [], office : [], ready : []
    },
    cart_total_summary : {
        cart_products : [], price_total : 0, total_discount : 0, price_subtotal : 0
    },
    cart_payment_method : '',
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CART :
            return Object.assign({}, state, {
                cart : _localstorage.getItem('CART') == null ? { student : [], office : [], ready : []} : _localstorage.getItem('CART')
            })  
        case ADD_CART :
            if(action.payload.type != 'ready') {
                let new_cart = {
                    ...state.cart , [action.payload.type] : action.payload.data
                }
                _localstorage.setItem('CART', new_cart)
                return Object.assign({}, state, {
                    cart : new_cart
                })  
            }
            else {
                if (state.cart.ready != null && state.cart.ready.length != null)
                {
                    let tmp_ready = state.cart.ready.filter(item => item.id != action.payload.data.id)
                    let new_ready = tmp_ready.concat(action.payload.data)
                    let new_cart = {
                        ...state.cart , ready : new_ready
                    }
                    _localstorage.setItem('CART', new_cart)
                    return Object.assign({}, state, {
                        cart : new_cart
                    }) 
                }
                else {
                    return state
                }
            }
        case INC_CART :
            let cur_cart = _localstorage.getItem('CART')
            cur_cart.map((item, index)=> {
                if(item.id == action.payload.id)
                {
                    item.cnt = action.payload.cnt
                }
            })
            _localstorage.setItem('CART', cur_cart)
            return Object.assign({}, state, {
                cart : cur_cart
            }) 
        case RMV_CART : 
            if(action.payload.type == 'student') {
                let new_student = state.cart.student.filter(item => item.id != action.payload.data)
                let new_cart = {
                    ...state.cart , student : new_student
                }
                _localstorage.setItem('CART', new_cart)
                return Object.assign({}, state, {
                    cart : new_cart
                })  
            }
            else if(action.payload.type == 'office') {
                let new_office = state.cart.office.filter(item => item.id != action.payload.data)
                let new_cart = {
                    ...state.cart , office : new_office
                }
                _localstorage.setItem('CART', new_cart)
                return Object.assign({}, state, {
                    cart : new_cart
                })  
            }
            else if(action.payload.type == 'ready') {
                let new_ready = state.cart.ready.filter(item => item.id != action.payload.data)
                let new_cart = {
                    ...state.cart , ready : new_ready
                }
                _localstorage.setItem('CART', new_cart)
                return Object.assign({}, state, {
                    cart : new_cart
                })  
            }
            else {
                return state
            }
            
        case CLEAR_CART : 
            _localstorage.removeItem('CART')
            return Object.assign({}, state, initialState)

        case SET_CART_SUMMARY :
            return Object.assign({}, state, {
                cart_total_summary : {
                    cart_products : action.payload.cart_products || [], 
                    price_total : action.payload.price_total || 0, 
                    total_discount : action.payload.total_discount || 0, 
                    price_subtotal : action.payload.price_subtotal || 0
                }
            })
        case SET_PAY_METHOD : 
            return Object.assign({}, state, {
                cart_payment_method : action.payload
            })
        default:
            return state
    }
}

export default cartReducer
