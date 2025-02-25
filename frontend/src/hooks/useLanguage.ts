import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";

export function useLanguage() {
  const lang = useSelector((state: RootState) => state.language);

  return lang;
}
