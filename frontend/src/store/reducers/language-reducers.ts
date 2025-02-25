import { SET_LANGUAGE, LanguageAction } from "@/store/actions/language-actions";

const initialState = localStorage.getItem("lang") || "en";

function languageReducer(state = initialState, action: LanguageAction) {
  switch (action.type) {
    case SET_LANGUAGE:
      localStorage.setItem("lang", action.payload);
      return action.payload;

    default:
      return state;
  }
}

export default languageReducer;
