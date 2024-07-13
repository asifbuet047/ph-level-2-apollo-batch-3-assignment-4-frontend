import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

function MainLayout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default MainLayout;
