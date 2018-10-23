import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./../redux";
import thunk from "redux-thunk";
import logger from "./../middleware/logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, logger, sagaMiddleware];

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(...middleware))(createStore)(
    reducers
  );
};
export default configureStore();
sagaMiddleware.run(rootSaga);
