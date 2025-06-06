import Image from "next/image";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@components/LocaleSwitcher";
import SignIn from "@components/SignIn";

export default function HomePage() {
  const t = useTranslations("Global");

  return (
    <div className="grid gap-4 justify-items-center">
      <Image
        src="/images/logo.svg"
        alt={`${process.env.APP_NAME} logo`}
        width={300}
        height={64}
        priority
      />

      <h1 className="text-3xl">{t("welcome")}</h1>

      <LocaleSwitcher />

      <SignIn />
    </div>
  );
}
