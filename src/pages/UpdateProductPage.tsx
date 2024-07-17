import React from "react";
import { useAppSelector } from "../redux/hooks";

function UpdateProductPage() {
  const appState = useAppSelector((state) => state.products.products);
  console.log(appState);
  return <div>UpdateProductPage</div>;
}

export default UpdateProductPage;
