import { Outlet } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import NavigationBarComponent from "./components/NavigationBarComponent";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className=" text-black">
      <Helmet>
        <title>Sportify Hub</title>
      </Helmet>
      <NavigationBarComponent></NavigationBarComponent>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
