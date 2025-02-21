import { ReactNode } from "react";
import { classNames } from "@/utils/helpers";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingTag = (typeof HEADING_TAGS)[number];

type HeadingProps = {
  as?: HeadingTag;
  className?: string;
  children?: ReactNode;
};

function Heading({ as = "h1", className, children, ...rest }: HeadingProps) {
  if (!HEADING_TAGS.includes(as)) {
    console.error(`Invalid "as" prop value: ${as}`);
    return null;
  }

  const Tag = as;
  const classes = classNames(["font-bold text-2xl md:text-4xl", className]);

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Heading;
