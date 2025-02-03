import { AppDispatch, StringMap } from "../store";
import { API_ENDPOINTS } from "../../config/api-config";

export const FETCH_STRINGS_REQUEST = "FETCH_STRINGS_REQUEST";
export const FETCH_STRINGS_SUCCESS = "FETCH_STRINGS_SUCCESS";
export const FETCH_STRINGS_FAILURE = "FETCH_STRINGS_FAILURE";

export type StringsAction =
  | { type: typeof FETCH_STRINGS_REQUEST }
  | { type: typeof FETCH_STRINGS_SUCCESS; payload: StringMap }
  | { type: typeof FETCH_STRINGS_FAILURE; error: string };

export function fetchStrings() {
  return function (dispatch: AppDispatch) {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({ type: FETCH_STRINGS_REQUEST });

    fetch(API_ENDPOINTS.strings, { signal })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_STRINGS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          dispatch({
            type: FETCH_STRINGS_FAILURE,
            error: error.message,
          });
        }
      });

    return () => {
      controller.abort();
    };
  };
}
