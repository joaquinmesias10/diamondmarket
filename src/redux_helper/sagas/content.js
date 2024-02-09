import { takeEvery, call, put } from "redux-saga/effects";
import { API_ABOUTUS, API_IMPNOTES, API_NEWS, SET_DESTINATIONS, SET_ABOUTUS, SET_IMPNOTES, SET_NEWS, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT } from '../constants/action-types';
import { get_aboutus, get_impnotes } from '../../apis/content';

export default function* watcherSaga() {
  yield takeEvery([API_ABOUTUS, API_IMPNOTES], workerSaga);
}

function* workerSaga(action) {
  try {
    if (action.type == API_ABOUTUS) {
      // yield put({type : SHOW_LOAD, payload : 'Getting Info...'});
      const response = yield call(get_aboutus, action.payload);
      yield put({ type: SET_ABOUTUS, payload: response.data().text });
      // yield put({type : DISMISS_LOAD, payload : ''});
    }
    else if (action.type == API_IMPNOTES) {
      yield put({type : SHOW_LOAD, payload : ''});
      const response = yield call(get_impnotes, action.payload);
      yield put({ type: SET_IMPNOTES, payload: response.data() });
      yield put({type : DISMISS_LOAD, payload : ''});
    } 
  } catch (e) {
    console.log(e)
    yield put({ type: DISMISS_LOAD, payload: '' });
    if (e.response != null && e.response.data != null && e.response.data.message != null) {
      yield put({ type: SHOW_ALERT, payload: { type: 'error', msg: e.response.data.message } });
    }

  }
}
