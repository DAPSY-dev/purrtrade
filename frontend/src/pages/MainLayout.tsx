import { Outlet } from "react-router";

function MainLayout() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Outlet />
    </main>
  );
}

export default MainLayout;
