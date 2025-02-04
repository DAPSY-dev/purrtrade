import { ReactNode } from "react";
import { classNames } from "@/utils/helpers";

type WrapperProps = {
  className?: string;
  children: ReactNode;
};

function Wrapper({ className, children }: WrapperProps) {
  const classes = classNames(["mx-auto px-4 w-full max-w-7xl", className]);

  return <div className={classes}>{children}</div>;
}

export default Wrapper;
