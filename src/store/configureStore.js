import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
  );
  // store.dispatch(verifyAuth());
  return store;
}