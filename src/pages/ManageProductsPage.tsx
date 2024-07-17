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
    <div className="flex flex-col md:flex-row justify-between align-middle items-center">
      <Card>
        <div onClick={addProduct} className="mt-2 mb-2">
          <AddProductButton></AddProductButton>
        </div>
      </Card>
      <Card>
        <div onClick={updateProduct} className="mt-2 mb-2">
          <UpdateProductButton></UpdateProductButton>
        </div>
      </Card>
      <Card>
        <div onClick={deleteProduct} className="mt-2 mb-2">
          <DeleteProductButton></DeleteProductButton>
        </div>
      </Card>
    </div>
  );
}

export default ManageProductsPage;
