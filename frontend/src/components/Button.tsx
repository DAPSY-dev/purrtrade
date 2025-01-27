import { ReactNode, ButtonHTMLAttributes } from "react";
import { classNames } from "../utils/helpers";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

function Button({
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = classNames(["py-2 px-3 bg-violet-700 text-white", className]);

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
