import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from "./reducers";

export const history = createBrowserHistory()

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer(history),
    persistedState,
    applyMiddleware(thunk, routerMiddleware(history))
  );
  // store.dispatch(verifyAuth());
  return store;
}