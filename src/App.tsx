import { Outlet } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import NavigationBarComponent from "./components/NavigationBarComponent";

function App() {
  return (
    <div className=" text-black">
      <NavigationBarComponent></NavigationBarComponent>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
