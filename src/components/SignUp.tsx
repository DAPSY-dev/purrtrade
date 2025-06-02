"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const id = useId();
  const t = useTranslations("SignUp");

  return (
    <form className="grid gap-4">
      <label htmlFor={`${id}-email`}>
        {t("email")}:
        <input
          type="email"
          name="email"
          id={`${id}-email`}
          autoComplete="email"
          className="border"
        />
      </label>
      <label htmlFor={`${id}-password`}>
        {t("password")}:
        <input
          type="password"
          name="password"
          id={`${id}-password`}
          className="border"
        />
      </label>
      <label htmlFor={`${id}-repeat-password`}>
        {t("repeatPassword")}:
        <input
          type="password"
          name="repeatPassword"
          id={`${id}-repeat-password`}
          className="border"
        />
      </label>
      <button type="submit" className="border">
        {t("cta")}
      </button>
    </form>
  );
}
