"use client";

import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";

export default function SignOut() {
  const t = useTranslations("SignOut");

  async function credentialsAction() {
    await signOut({
      redirect: false,
    });
  }

  return (
    <form action={credentialsAction}>
      <button type="submit" className="border">
        {t("cta")}
      </button>
    </form>
  );
}
