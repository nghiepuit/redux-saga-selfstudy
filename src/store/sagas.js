import {fork, take, call, put} from "redux-saga/effects";
import {types} from './../redux/actions/TaskActionTypes';
import * as api from './../api';

export default function* rootSaga(getState) {
  yield fork(watchFetchTasks);
}
/**
 * If FETCH_TASKS action called => this saga will called
 */
function* watchFetchTasks() {
  while(true) {
    yield take(types.FETCH_TASKS);
    try {
      const {data} = yield call(api.fetchtasks);
      yield put({
        type: types.FETCH_TASKS_SUCCESS,
        payload: {
          tasks: data
        }
      });
    } catch (e) {
      yield put({
        type: types.FETCH_TASKS_FAILED,
        payload: {
          error: e
        }
      });
    }
  }
}