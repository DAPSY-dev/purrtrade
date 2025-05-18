import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import "@/envConfig.ts";

const defaultLocale = await import(
  `@locales/${process.env.APP_DEFAULT_LOCALE}.json`
);

export function renderWithLocales(ui: ReactNode) {
  return render(
    <NextIntlClientProvider
      locale={process.env.APP_DEFAULT_LOCALE}
      messages={defaultLocale}
    >
      {ui}
    </NextIntlClientProvider>
  );
}
