import { AppDispatch, StringMap } from "@/store/store";
import { API_ENDPOINTS } from "@/config/api-config";

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

    dispatch({ type: FETCH_STRINGS_REQUEST });

    fetch(API_ENDPOINTS.strings, {
      signal: controller.signal,
      headers: {
        "api-key": import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_STRINGS_SUCCESS,
          payload: data.strings,
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

    return {
      abort() {
        controller.abort();
      },
    };
  };
}
