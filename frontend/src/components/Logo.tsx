import { Link } from "react-router";
import { classNames } from "../utils/helpers";

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  const classes = classNames(["block max-w-40", className]);

  return (
    <Link to="/" className={classes}>
      <picture className="block max-w-full">
        <img
          src="/images/logo/logo.svg"
          alt={import.meta.env.VITE_APP_NAME}
          width="300"
          height="64"
        />
      </picture>
    </Link>
  );
}

export default Logo;
