import { UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";
import { classNames } from "@/utils/helpers";

type MainNavProps = {
  className?: string;
};

function MainNav({ className }: MainNavProps) {
  const strings = useStrings();

  if (strings === null) {
    return null;
  }

  const classes = classNames([
    "flex flex-wrap items-center justify-between gap-4",
    className,
  ]);

  return (
    <nav className={classes}>
      <CTA as="router-nav-link" variant="link" to="/login">
        <UserIcon className="me-1 inline-block size-4" />
        {strings["LOGIN"]}
      </CTA>
      <CTA as="router-nav-link" variant="link" to="/register">
        <UserPlusIcon className="me-1 inline-block size-4" />
        {strings["REGISTER"]}
      </CTA>
    </nav>
  );
}

export default MainNav;
