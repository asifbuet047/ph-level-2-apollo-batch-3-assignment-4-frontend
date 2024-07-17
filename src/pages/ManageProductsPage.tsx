import AddProduct from "./AddProductPage";
import { Card } from "antd";
import AddProductButton from "../components/AddProductButton";
import UpdateProductButton from "../components/UpdateProductButton";
import DeleteProductButton from "../components/DeleteProductButton";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function ManageProductsPage() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const addProduct = () => {
    setClick(true);
    navigate("/manage/add");
  };
  const updateProduct = () => {
    setClick(true);
    navigate("/manage/update");
  };
  const deleteProduct = () => {
    setClick(true);
    navigate("/manage/delete");
  };
  return (
    <div className="flex flex-col md:flex-row justify-center align-middle items-center">
      <Card className="border-2 border-red-300">
        <div onClick={addProduct}>
          <AddProductButton></AddProductButton>
        </div>
        <div onClick={updateProduct}>
          <UpdateProductButton></UpdateProductButton>
        </div>
        <div onClick={deleteProduct}>
          <DeleteProductButton></DeleteProductButton>
        </div>
      </Card>
    </div>
  );
}

export default ManageProductsPage;
