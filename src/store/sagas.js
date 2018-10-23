import {call, put, takeLatest, takeEvery, take} from "redux-saga/effects";
import {delay, channel} from "redux-saga";
import {types} from './../redux/actions/TaskActionTypes';
import * as api from './../api';

export default function* rootSaga(getState) {
  yield takeLatest(types.FETCH_TASKS, fetchTasks);
  // yield takeEvery(types.TIMER_STARTED, handleProgressTimer);
  yield takeLatestById([types.TIMER_STARTED, types.TIMER_STOPPED], handleProgressTimer);
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

function* takeLatestById(actionType, saga) {
  const channelsMap = {};
  while (true) {
    const action = yield take(actionType);
    const {taskId} = action.payload;
    if (!channelsMap[taskId]) {
      channelsMap[taskId] = channel();
      yield takeLatest(channelsMap[taskId], saga);
    }

    yield put(channelsMap[taskId], action);

  }
}

function* handleProgressTimer({payload, type}) {
  if (type === types.TIMER_STARTED) {
    while(true) {
      yield call(delay, 1000);
      yield put({
        type: types.TIME_INCREMENT,
        payload: {
          taskId: payload.taskId
        }
      });
    }
  }
}