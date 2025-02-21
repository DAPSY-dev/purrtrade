import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link, NavLink, LinkProps, NavLinkProps } from "react-router";
import { classNames } from "@/utils/helpers";

type CTAProps = (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | LinkProps
) & {
  as?: "button" | "anchor" | "router-link" | "router-nav-link";
  variant?: "button" | "link" | "none";
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: ReactNode;
};

function CTA({
  as = "button",
  variant = "button",
  type = "button",
  className,
  children,
  ...rest
}: CTAProps) {
  const classes = classNames([
    variant === "button" &&
      "inline-block px-6 py-3 bg-primary rounded-md text-base text-white text-center transition hover:bg-secondary",
    variant === "link" &&
      "text-primary underline transition hover:text-secondary",
    variant === "none" && null,
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

export default CTA;
