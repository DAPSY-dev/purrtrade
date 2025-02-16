import Wrapper from "@/components/Wrapper";
import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";

type MainHeaderProps = {
  className?: string;
};

function MainHeader({ className }: MainHeaderProps) {
  return (
    <header className={className}>
      <Wrapper>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo />

          <MainNav />
        </div>
      </Wrapper>
    </header>
  );
}

export default MainHeader;
