import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";

export function useStrings() {
  const { strings, loading, error } = useSelector(
    (state: RootState) => state.strings
  );

  if (loading) {
    return { strings: null, loading: true, error: null };
  }

  if (error) {
    console.error(error);
    return { strings: null, loading: false, error: error };
  }

  return { strings: strings, loading: false, error: null };
}
