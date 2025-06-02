import { defineRouting } from "next-intl/routing";

export const languages = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "bg",
    label: "Български",
  },
];

const locales = languages.map((lang) => lang.code);

export const routing = defineRouting({
  locales,
  defaultLocale: process.env.APP_DEFAULT_LOCALE!,
  localeCookie: {
    // Expire in one year
    maxAge: 31536000,
  },
});
