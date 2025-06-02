import { useTranslations } from "next-intl";

export default function SignInPage() {
  const t = useTranslations("SignIn");

  return (
    <div className="grid gap-4 justify-items-center">
      <h1>{t("title")}</h1>
    </div>
  );
}
