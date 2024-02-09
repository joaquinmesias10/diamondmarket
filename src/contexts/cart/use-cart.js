import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice , BookingTotalPrice} from './cart.reducer';
import { useStorage } from '../../utils/use-storage';
import _localstorage from '../../utils/localstorage'

const CartContext = createContext({} );
const INITIAL_STATE = {
  isOpen: false,
  items: _localstorage.getItem('POSSTORE_CART') || [],
  subProducts : [],
  booking : {},
  isRestaurant: false,
  coupon: null,
  points : null,
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item,  } });
  };
  const removeItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
  };
  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };
  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const userpointsHandler = (points) => {
    dispatch({ type: 'APPLY_POINTS', payload: points });
  };
  const removeUserpointsHandler = () => {
    dispatch({ type: 'REMOVE_POINTS' });
  };

  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };

  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.product.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.product.id === id);
  };
  
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    var discount = 0
    if(state.coupon != null) {
      let discount_val = parseFloat(state.coupon.discount) 
      if (state.coupon.fixed == true)
      {
          discount = discount_val
      }
      else{
          discount = total * discount_val / 100
      }
    }
    
    return discount.toFixed(2);
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // sub products selection handler
  const addSubProductHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_SUBP_ITEM', payload: { ...item, quantity } });
  };
  const removeSubProductHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_SUBP_ITEM', payload: { ...item, quantity } });
  };
  const clearSubProductHandler = () => {
    dispatch({ type: 'CLEAR_SUBP_ITEM', payload: {} });
  };
  const isInSubProductsHandler = (id) => {
    return state.subProducts?.some((item) => item.id === id);
  };


  // booking
  const ApplyBookingHandler = (booking) => {
    dispatch({ type: 'APPLY_BOOKING', payload: booking });
  };
  const RemoveBookingHandler = () => {
    dispatch({ type: 'REMOVE_BOOKING' });
  };
  const getBookingPrice = () => BookingTotalPrice(state.booking).toFixed(2);
  const getBookingTotalPrice = () => BookingTotalPrice(state.booking, state.coupon).toFixed(2);
  const getBookingDiscount = () => {
    const total = BookingTotalPrice(state.booking);
    var discount = 0
    if(state.coupon != null) {
      let discount_val = parseFloat(state.coupon.discount) 
      if (state.coupon.fixed == true)
      {
          discount = discount_val
      }
      else{
          discount = total * discount_val / 100
      }
    }
    
    return discount.toFixed(2);
  };
  // end booking

  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    userpointsHandler,
    removeUserpointsHandler,
    toggleRestaurant,
    addSubProductHandler,
    removeSubProductHandler,
    clearSubProductHandler,
    isInSubProductsHandler,

    ApplyBookingHandler,
    RemoveBookingHandler,
    getBookingPrice,
    getBookingTotalPrice,
    getBookingDiscount,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    userpointsHandler,
    removeUserpointsHandler,
    getCartItemsPrice,
    getDiscount,
    toggleRestaurant,
    addSubProductHandler,
    removeSubProductHandler,
    clearSubProductHandler,
    isInSubProductsHandler,

    ApplyBookingHandler,
    RemoveBookingHandler,
    getBookingPrice,
    getBookingTotalPrice,
    getBookingDiscount,
  } = useCartActions();
  // const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        points : state.points,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,
        subProducts : state.subProducts,
        booking : state.booking,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,

        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler, 
        calculateDiscount: getDiscount,

        applyPoints : userpointsHandler,
        removePoints : removeUserpointsHandler,

        toggleRestaurant,
        addSubProduct: addSubProductHandler,
        removeSubProduct: removeSubProductHandler,
        clearSubProduct: clearSubProductHandler,
        isInSubProducts : isInSubProductsHandler,

        ApplyBooking: ApplyBookingHandler,
        RemoveBooking : RemoveBookingHandler,
        calculateBookingPrice : getBookingPrice,
        calculateBookingTotalPrice :  getBookingTotalPrice,
        calculateBookingDiscount : getBookingDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
