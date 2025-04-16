import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";

export function useStrings() {
  const { strings, loading, error } = useSelector(
    (state: RootState) => state.strings
  );

  if (loading) {
    return null;
  }

  if (error) {
    throw new Error(error);
  }

  return strings;
}
