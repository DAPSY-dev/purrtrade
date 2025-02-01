import { combineReducers } from "redux";
import stringsReducer from "./strings-reducers";

const rootReducer = combineReducers({
  strings: stringsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
