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
        {strings["LOGIN"]}
      </CTA>
      <CTA as="router-nav-link" variant="link" to="/register">
        {strings["REGISTER"]}
      </CTA>
    </nav>
  );
}

export default MainNav;
