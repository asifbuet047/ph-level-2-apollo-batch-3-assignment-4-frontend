import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className=" text-black">
      <NavigationBar></NavigationBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
