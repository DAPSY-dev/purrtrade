"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const id = useId();
  const t = useTranslations("SignIn");

  async function credentialsAction(formData: FormData) {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log(response);
  }

  return (
    <form action={credentialsAction} className="grid gap-4">
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
      <button type="submit" className="border">
        {t("cta")}
      </button>
    </form>
  );
}
