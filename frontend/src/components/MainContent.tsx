import { ReactNode } from "react";
import Wrapper from "@/components/Wrapper";

type MainContentProps = {
  className?: string;
  children?: ReactNode;
};

function MainContent({ className, children }: MainContentProps) {
  return (
    <main className={className}>
      <Wrapper>{children}</Wrapper>
    </main>
  );
}

export default MainContent;
