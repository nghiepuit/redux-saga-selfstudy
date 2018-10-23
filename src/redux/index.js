import { combineReducers }  from 'redux';
import { reducer as TaskReducer } from "./reducers/TaskReducer";

const reducers = {
  tasks: TaskReducer
};

export default combineReducers({
  ...reducers
});
