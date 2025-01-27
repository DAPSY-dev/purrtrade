import { API_ENDPOINTS } from "../../config/api-config";

export const FETCH_STRINGS_REQUEST = "FETCH_STRINGS_REQUEST";
export const FETCH_STRINGS_SUCCESS = "FETCH_STRINGS_SUCCESS";
export const FETCH_STRINGS_FAILURE = "FETCH_STRINGS_FAILURE";

export const fetchStrings = () => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_STRINGS_REQUEST });
    fetch(API_ENDPOINTS.strings)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: FETCH_STRINGS_SUCCESS,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: FETCH_STRINGS_FAILURE,
          payload: error.message,
        })
      );
  };
};
