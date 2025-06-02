import Image from "next/image";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@components/LocaleSwitcher";
import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp";
import SignOut from "@components/SignOut";

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

      <hr className="my-4 w-full" />

      <LocaleSwitcher />

      <hr className="my-4 w-full" />

      <SignIn />

      <hr className="my-4 w-full" />

      <SignUp />

      <hr className="my-4 w-full" />

      <SignOut />
    </div>
  );
}
