import { takeEvery,takeLatest, call, put } from "redux-saga/effects";
import {API_LOGIN, API_REGISTER, API_VERIFY, API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, SET_USER, SET_USER_PROFILE} from '../constants/action-types';
import {getProfile, updateProfile} from '../../apis/user';
import _localstorage from '../../utils/localstorage';

export default function* watcherSaga() {
  yield takeEvery([API_LOGIN, API_REGISTER, API_VERIFY, API_GET_USER_PROFILE, API_UPDATE_USER_PROFILE], workerSaga);
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
    else if (action.type == API_GET_USER_PROFILE)
    {
      yield put({type : SHOW_LOAD, payload : ''});
      const response = yield call(getProfile, action.payload);
      yield put({type : SET_USER_PROFILE, payload : response.data()});
      yield put({type : DISMISS_LOAD, payload : ''});
    }
    else if (action.type == API_UPDATE_USER_PROFILE) {
      yield put({type : SHOW_LOAD, payload : ''});
      const response = yield call(updateProfile, action.payload.user_id, action.payload.params);
      yield put({type : API_GET_USER_PROFILE, payload : action.payload.user_id});
      yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'Profile is updated successfully!'}});
      yield put({type : DISMISS_LOAD, payload : ''});
    }
  } catch (e) {
    console.log(e)
    yield put({ type: DISMISS_LOAD, payload: '' });
    if(e.response != null && e.response.data != null && e.response.data.message != null)
    {
      yield put({type : SHOW_ALERT, payload : {type : 'error', msg : e.response.data.message }});
    }
    else {
      yield put({type : SHOW_ALERT, payload : {type : 'error', msg : 'something went wrong!' }});
    }
  }
}
