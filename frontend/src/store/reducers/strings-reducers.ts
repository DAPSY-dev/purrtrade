import { StringMap } from "@/store/store";
import {
  FETCH_STRINGS_REQUEST,
  FETCH_STRINGS_SUCCESS,
  FETCH_STRINGS_FAILURE,
  StringsAction,
} from "@/store/actions/strings-actions";

type StringsState = {
  strings: StringMap;
  loading: boolean;
  error: null | string;
};

const initialState = {
  strings: {},
  loading: false,
  error: null,
};

function stringsReducer(
  state: StringsState = initialState,
  action: StringsAction
) {
  switch (action.type) {
    case FETCH_STRINGS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_STRINGS_SUCCESS:
      return { ...state, loading: false, strings: action.payload };

    case FETCH_STRINGS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export default stringsReducer;
