import Wrapper from "@/components/Wrapper";
import Copyright from "@/components/Copyright";

type MainFooterProps = {
  className?: string;
};

function MainFooter({ className }: MainFooterProps) {
  return (
    <footer className={className}>
      <Wrapper>
        <Copyright />
      </Wrapper>
    </footer>
  );
}

export default MainFooter;
