import { types } from './TaskActionTypes';
import * as api from './../../api';

export const createTask = ({title, description, status = 'UNSTARTED', timer = 0}) => {
  return dispatch => {
    api.createTask({title, description, status, timer})
      .then(res => {
        dispatch(createTaskSuccess(res.data))
      })
      .catch(err => {
        dispatch(createTaskFailed(err));
      });
  }
}

export const createTaskSuccess = data => {
  return {
    type: types.CREATE_TASK_SUCCESS,
    payload: {
      task: data
    }
  }
}

export const createTaskFailed = err => {
  return {
    type: types.CREATE_TASK_FAILED,
    payload: {
      error: err
    }
  }
}

export const updateTask = (id, params = {}) => {
  return (dispatch, getState) => {
    const tasks = getState().tasks.tasks;
    const task = tasks.find(task => task.id === id);
    const updatedTask = Object.assign({}, task, params);
    api.updateTask(id, updatedTask)
      .then(res => {
        dispatch(updateTaskSuccess(res.data))

        if (res.data.status === "INPROGRESS") {
          return dispatch(progressTimerStart(res.data.id));
        }

        if (task.status === "INPROGRESS") {
          return dispatch(progressTimerStop(res.data.id));
        }

      })
      .catch(err => {
        dispatch(updateTaskFailed(err));
      });
  }
}

export const progressTimerStart = taskId => {
  return {
    type: types.TIMER_STARTED,
    payload: {
      taskId
    }
  }
}

export const progressTimerStop = taskId => {
  return {
    type: types.TIMER_STOPPED,
    payload: {
      taskId
    }
  }
}

export const updateTaskSuccess = data => {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    payload: {
      task: data
    }
  }
}

export const updateTaskFailed = err => {
  return {
    type: types.UPDATE_TASK_FAILED,
    payload: {
      error: err
    }
  }
}

export const fetchTasks = () => {
  return {
    type: types.FETCH_TASKS
  }
}

export const fetchTasksSuccess = data => {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    payload: {
      tasks: data
    }
  }
}

export const fetchTasksFailed = err => {
  return {
    type: types.FETCH_TASKS_FAILED,
    payload: {
      error: err
    }
  }
}