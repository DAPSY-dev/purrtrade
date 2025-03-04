import { ReactNode } from "react";
import { classNames } from "@/utils/helpers";

type BoxProps = {
  className?: string;
  children?: ReactNode;
};

function Box({ className, children }: BoxProps) {
  const classes = classNames([
    "rounded-md bg-white p-4 shadow-md md:p-6",
    className,
  ]);

  return <div className={classes}>{children}</div>;
}

export default Box;
