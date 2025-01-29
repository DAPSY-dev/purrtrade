import {
  FETCH_STRINGS_REQUEST,
  FETCH_STRINGS_SUCCESS,
  FETCH_STRINGS_FAILURE,
} from "../actions/strings-actions";

const initialState = {
  strings: [],
  loading: false,
  error: null,
};

function stringsReducer(state = initialState, action: any) {
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
