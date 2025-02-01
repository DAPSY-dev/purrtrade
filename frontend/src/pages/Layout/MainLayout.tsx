import { Outlet } from "react-router";
import Wrapper from "../../components/Wrapper";
import Logo from "../../components/Logo";
import Copyright from "../../components/Copyright";

function MainLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gray-100">
      <header className="py-4">
        <Wrapper>
          <Logo />
        </Wrapper>
      </header>

      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>

      <footer className="py-4">
        <Wrapper>
          <Copyright />
        </Wrapper>
      </footer>
    </div>
  );
}

export default MainLayout;
