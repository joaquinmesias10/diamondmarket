import { takeEvery, call, put, all } from "redux-saga/effects";
import user from './user';
import content from './content';
import cart from './cart';

export default function* watcherSaga() {
  yield all([call(user), call(content), call(cart)]);
}
