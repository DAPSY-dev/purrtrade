import { Outlet } from "react-router";
import MainHeader from "@/components/MainHeader";
import MainContent from "@/components/MainContent";
import MainFooter from "@/components/MainFooter";

function MainLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-gray-100">
      <MainHeader className="py-4" />

      <MainContent>
        <Outlet />
      </MainContent>

      <MainFooter className="py-4" />
    </div>
  );
}

export default MainLayout;
