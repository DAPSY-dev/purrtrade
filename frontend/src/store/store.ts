import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  Action,
  Reducer,
  Dispatch,
} from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "@/store/reducers";

const composeEnhancers =
  (import.meta.env.DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer as Reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type AppDispatch = Dispatch;
export type ThunkDispatchType = ThunkDispatch<RootState, undefined, Action>;
export type StringMap = { [key: string]: string };

export default store;
