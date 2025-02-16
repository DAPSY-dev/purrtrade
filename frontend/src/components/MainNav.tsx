import CTA from "@/components/CTA";
import { classNames } from "@/utils/helpers";

type MainNavProps = {
  className?: string;
};

function MainNav({ className }: MainNavProps) {
  const classes = classNames([
    "flex flex-wrap items-center justify-between gap-4",
    className,
  ]);

  return (
    <nav className={classes}>
      <CTA as="router-nav-link" variant="link" to="/login">
        Login
      </CTA>
      <CTA as="router-nav-link" variant="link" to="/register">
        Register
      </CTA>
    </nav>
  );
}

export default MainNav;
