import {combineReducers} from 'redux';
// import reducers
import userReducer from './user';
import favoriteReducer from './favorite';
import cartReducer from './cart';
import loadingReducer from './loading';
import alertReducer from './alert';
import contentReducer from './content';
import productsReducer from './products';
import globalReducer from './global';
import ordersReducer from './orders';
import servicesReducer from './services';

export default combineReducers({
    userReducer, favoriteReducer, cartReducer, loadingReducer, alertReducer, contentReducer, 
    productsReducer, globalReducer, ordersReducer, servicesReducer
});