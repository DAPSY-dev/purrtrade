import { ReactNode } from "react";
import { classNames } from "@/utils/helpers";

type WrapperProps = {
  className?: string;
  children?: ReactNode;
};

function Wrapper({ className, children }: WrapperProps) {
  const classes = classNames(["mx-auto w-full max-w-7xl px-4", className]);

  return <div className={classes}>{children}</div>;
}

export default Wrapper;
