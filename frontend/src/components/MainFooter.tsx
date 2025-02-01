import Wrapper from "./Wrapper";
import Copyright from "./Copyright";

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
