import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import "@app/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "math",
    "symbols",
    "vietnamese",
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    namespace: "App",
    locale,
  });

  return {
    title: process.env.APP_NAME,
    description: t("description"),
    appleWebApp: {
      title: process.env.APP_NAME,
    },
    metadataBase: new URL(process.env.APP_URL!),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} font-[family-name:var(--font-roboto)] antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
