import Wrapper from "@/components/Wrapper";
import Logo from "@/components/Logo";

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
