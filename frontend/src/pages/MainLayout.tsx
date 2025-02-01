import { Outlet } from "react-router";
import Logo from "../components/Logo";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Logo />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <span>
          <small>&copy; Purrtrade</small>
        </span>
      </footer>
    </div>
  );
}

export default MainLayout;
