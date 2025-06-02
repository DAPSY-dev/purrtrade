import { ReactNode } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    namespace: "SignIn",
    locale,
  });

  return {
    title: `${process.env.APP_NAME} - ${t("title")}`,
  };
}

export default function SignInLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
