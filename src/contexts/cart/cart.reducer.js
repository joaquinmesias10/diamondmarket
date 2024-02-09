import { conforms } from 'lodash';
import { getDiscount, getDiscountedPrice } from '../../utils/product'
import _localstorage from '../../utils/localstorage'


export const BookingTotalPrice = (booking, coupon = null) => {
  if (booking.booking_service == null) { return 0 }
  const itemCost = getDiscountedPrice(booking.booking_service)

  var discount = 0
  if (coupon != null) {
    let discount_val = parseFloat(coupon.discount)
    if (coupon.fixed == true) {
      discount = discount_val
    }
    else {
      discount = itemCost * discount_val / 100
    }
  }

  if (discount > itemCost) {
    return 0
  }
  return itemCost - discount;
};

// export const cartItemsTotalPrice = (items, { discountInPercent = 0 } = {}) => {
export const cartItemsTotalPrice = (items, coupon = null) => {
  if (items === null || items.length === 0) return 0;
  const itemCost = items.reduce((total, item) => {
    const salePrice = getDiscountedPrice(item.product)
    let total_subproducts = 0
    // if (item.subProducts != null || item.subProducts.length != 0) {
    //   item.subProducts.map((sub_item) => {
    //     total_subproducts = total_subproducts + getDiscountedPrice(sub_item)
    //   })
    // }

    return total + (salePrice + total_subproducts) * item.quantity;
  }, 0);
  // const discountRate = 1 - discountInPercent;
  var discount = 0
  if (coupon != null) {
    let discount_val = parseFloat(coupon.discount)
    if (coupon.fixed == true) {
      discount = discount_val
    }
    else {
      discount = itemCost * discount_val / 100
    }
  }

  // itemCost * discountRate * TAX_RATE + shipping;
  // return itemCost * discountRate;
  return parseInt(itemCost - discount);
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
  const found_id = state.items.findIndex(
    (item) => (item.product.id === action.payload.product.id) && (item.subProduct.id == action.payload.subProduct.id)
  );

  let newState = state.items.slice(0, state.items.length);
  if (found_id > -1) {
    newState[found_id] = {
      ...newState[found_id],
      quantity: newState[found_id].quantity + action.payload.quantity
    }
    return newState;
  }
  else {
    return [...state.items, action.payload]
  }
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.product.id === action.payload.product.id && item.subProduct != null
         && action.payload.subProduct != null && item.subProduct.id == action.payload.subProduct.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const clearItemFromCart = (state, action) => {
  return state.items.filter((item) => (item.product.id !== action.payload.product.id || 
    (item.subProduct != null && action.payload.subProduct != null && item.subProduct.id != action.payload.subProduct.id)));
};

const addSubProduct = (state, action) => {
  const existingCartItemIndex = state.subProducts.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    return state;
  }
  return [...state.subProducts, action.payload];
};
const removeSubProduct = (state, action) => {
  let tmp = state.subProducts;
  const existingCartItemIndex = tmp.findIndex(
    (item) => item.id === action.payload.id
  );
  if (existingCartItemIndex > -1) {
    return tmp.splice(existingCartItemIndex, 1);
  }
  return tmp;
};

export const reducer = (state, action) => {
  let new_cart = {}
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, ...action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD_ITEM':
      new_cart = addItemToCart(state, action)
      _localstorage.setItem('POSSTORE_CART', new_cart)
      return { ...state, items: new_cart };
    case 'REMOVE_ITEM':
      new_cart = removeItemFromCart(state, action)
      _localstorage.setItem('POSSTORE_CART', new_cart)
      return { ...state, items: new_cart };
    case 'CLEAR_ITEM_FROM_CART':
      new_cart = clearItemFromCart(state, action)
      _localstorage.setItem('POSSTORE_CART', new_cart)
      return { ...state, items: new_cart };
    case 'CLEAR_CART':
      _localstorage.setItem('POSSTORE_CART', [])
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };

    case 'APPLY_POINTS':
      return { ...state, points: action.payload };
    case 'REMOVE_POINTS':
      return { ...state, points: null };

    case 'TOGGLE_RESTAURANT':
      return { ...state, isRestaurant: !state.isRestaurant };
    case 'ADD_SUBP_ITEM':
      return { ...state, subProducts: addSubProduct(state, action) };
    case 'REMOVE_SUBP_ITEM':
      return { ...state, subProducts: removeSubProduct(state, action) };
    case 'CLEAR_SUBP_ITEM':
      return { ...state, subProducts: [] };

    case 'APPLY_BOOKING':
      return { ...state, booking: action.payload };
    case 'REMOVE_BOOKING':
      return { ...state, booking: {} };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}; 