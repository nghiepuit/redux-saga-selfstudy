import {types} from './../actions/TaskActionTypes';
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  success: null
};

export const reducer = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case types.FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: payload.tasks,
        loading: false,
        error: null
      }
    }
    case types.FETCH_TASKS_FAILED: {
      return {
        ...state,
        tasks: [],
        loading: false,
        error: payload.error,
        success: false
      }
    }
    case types.CREATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.concat(payload.task),
        loading: false,
        error: null,
        success: true
      }
    }
    case types.UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === payload.task.id) {
            return payload.task;
          }
          return task;
        }),
        loading: false,
        error: null,
        success: true
      }
    }
    case types.CREATE_TASK_FAILED: 
    case types.UPDATE_TASK_FAILED: {
      return {
        ...state,
        loading: false,
        error: payload.error,
        success: false
      }
    }
    case types.FETCH_TASKS: {
      return {
        ...state,
        loading: true
      }
    }
    default:
      return state;
  }
};
