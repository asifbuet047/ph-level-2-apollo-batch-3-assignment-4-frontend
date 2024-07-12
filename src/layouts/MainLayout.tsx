import React from "react";
import HomePage from "../pages/HomePage";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div>
      <Header></Header>
      <HomePage></HomePage>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
