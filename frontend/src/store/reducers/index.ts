import { combineReducers } from "redux";
import stringsReducer from "./strings-reducers";

const rootReducer = combineReducers({
  strings: stringsReducer,
});

export default rootReducer;
