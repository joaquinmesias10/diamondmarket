import {createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import appReducer from '../reducers';
import appMiddleware from '../middlewares';
import apiSaga from "../sagas";

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appReducer,
    storeEnhancers(applyMiddleware(...appMiddleware, thunk, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);
export default store;