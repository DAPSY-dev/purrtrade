import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link, NavLink, LinkProps, NavLinkProps } from "react-router";
import { classNames } from "@/utils/helpers";

type ButtonProps = (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | LinkProps
) & {
  as?: "button" | "anchor" | "router-link" | "router-nav-link";
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: ReactNode;
};

function Button({
  as = "button",
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = classNames([
    "inline-block px-6 py-3 bg-gray-700 rounded-full text-white text-center transition-colors hover:bg-gray-600",
    className,
  ]);

  switch (as) {
    case "button":
      return (
        <button
          type={type}
          className={classes}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );

    case "anchor":
      return (
        <a
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );

    case "router-link":
      return (
        <Link className={classes} {...(rest as LinkProps)}>
          {children}
        </Link>
      );

    case "router-nav-link":
      return (
        <NavLink className={classes} {...(rest as NavLinkProps)}>
          {children}
        </NavLink>
      );

    default:
      console.error(`Invalid "as" prop value: ${as}`);
      return null;
  }
}

export default Button;
