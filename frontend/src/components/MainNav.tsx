import { NavLink } from "react-router";
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
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}

export default MainNav;
