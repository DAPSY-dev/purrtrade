import { combineReducers } from "redux";
import languageReducer from "@/store/reducers/language-reducers";
import stringsReducer from "@/store/reducers/strings-reducers";

const rootReducer = combineReducers({
  language: languageReducer,
  strings: stringsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
