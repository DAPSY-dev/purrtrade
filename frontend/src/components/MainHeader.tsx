import Wrapper from "./Wrapper";
import Logo from "./Logo";

type MainHeaderProps = {
  className?: string;
};

function MainHeader({ className }: MainHeaderProps) {
  return (
    <header className={className}>
      <Wrapper>
        <Logo />
      </Wrapper>
    </header>
  );
}

export default MainHeader;
