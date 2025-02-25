export const SET_LANGUAGE = "SET_LANGUAGE";

export type LanguageAction = {
  type: typeof SET_LANGUAGE;
  payload: string;
};

export function setLanguage(lang: string) {
  return {
    type: SET_LANGUAGE,
    payload: lang,
  };
}
