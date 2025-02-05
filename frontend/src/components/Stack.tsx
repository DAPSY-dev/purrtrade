import { ReactNode } from "react";
import { classNames } from "@/utils/helpers";

type StackProps = {
  direction?: "row" | "column";
  gap?: number;
  className?: string;
  children?: ReactNode;
};

function Stack({ direction, gap, className, children }: StackProps) {
  const classes = classNames([
    "flex",
    direction === "row" ? "flex-row" : "flex-col",
    gap ? `gap-${gap}` : null,
    className,
  ]);

  return <div className={classes}>{children}</div>;
}

export default Stack;
