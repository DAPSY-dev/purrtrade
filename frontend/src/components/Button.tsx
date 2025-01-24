import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

function Button({
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`py-2 px-3 bg-violet-700 text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
