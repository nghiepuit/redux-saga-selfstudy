import {call, put, takeLatest} from "redux-saga/effects";
import {types} from './../redux/actions/TaskActionTypes';
import * as api from './../api';

export default function* rootSaga(getState) {
  yield takeLatest(types.FETCH_TASKS, fetchTasks);
}
/**
 * If FETCH_TASKS action called => this saga will called
 */
function* fetchTasks() {
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