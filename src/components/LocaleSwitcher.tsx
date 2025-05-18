"use client";

import { ChangeEvent, useTransition } from "react";
import { useParams } from "next/navigation";
import { Locale, useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@i18n/navigation";
import { languages } from "@i18n/routing";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;

    startTransition(() => {
      router.replace(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params,
        },
        {
          locale: nextLocale,
        }
      );
    });
  }

  return (
    <select
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
      aria-label={t("label")}
    >
      {languages.map((lang) => (
        <option value={lang.code} key={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
