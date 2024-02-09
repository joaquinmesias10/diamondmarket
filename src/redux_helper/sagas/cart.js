import { takeEvery,takeLatest, call, put } from "redux-saga/effects";
import {API_LOGIN, API_REGISTER, API_VERIFY, API_GETFAV, GET_CART, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, SET_USER} from '../constants/action-types';
import {} from '../../apis/user';
import _localstorage from '../../utils/localstorage';

export default function* watcherSaga() {
  yield takeEvery([API_LOGIN, API_REGISTER, API_VERIFY], workerSaga);
}

function* workerSaga(action) {
  try {
    if(action.type == API_LOGIN)
    {
      yield put({type : SHOW_LOAD, payload : 'Loging in...'});
      yield put({type : DISMISS_LOAD, payload : ''});
      yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'Login Success!'}});
    }
    else if(action.type == API_REGISTER)
    {
      yield put({type : SHOW_LOAD, payload : 'Registering ...'});
      yield put({type : DISMISS_LOAD, payload : ''});
    }
    else if(action.type == API_VERIFY)
    {
      yield put({type : SHOW_LOAD, payload : 'Verifying User...'});
      yield put({type : DISMISS_LOAD, payload : ''});
      yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'Register Success!'}});
    }

  } catch (e) {
    console.log(e)
    yield put({ type: DISMISS_LOAD, payload: '' });
    if(e.response != null && e.response.data != null && e.response.data.message != null)
    {
      yield put({type : SHOW_ALERT, payload : {type : 'error', msg : e.response.data.message }});
    }
  }
}
