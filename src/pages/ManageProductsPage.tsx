import { Card } from "antd";
import AddProductButtonComponent from "../components/AddProductButtonComponent";
import UpdateProductButtonComponent from "../components/UpdateProductButtonComponent";
import DeleteProductButtonComponent from "../components/DeleteProductButtonComponent";
import { useNavigate } from "react-router-dom";

function ManageProductsPage() {
  const navigate = useNavigate();

  const addProduct = () => {
    navigate("/manage/add");
  };
  const updateProduct = () => {
    navigate("/manage/update");
  };
  const deleteProduct = () => {
    navigate("/manage/delete");
  };
  return (
    <div className="flex flex-col md:flex-row flex-grow justify-between align-middle items-center">
      <div onClick={addProduct} className="m-2 flex-grow w-full">
        <AddProductButtonComponent></AddProductButtonComponent>
      </div>

      <div onClick={updateProduct} className="m-2 flex-grow w-full">
        <UpdateProductButtonComponent></UpdateProductButtonComponent>
      </div>

      <div onClick={deleteProduct} className="m-2 flex-grow w-full">
        <DeleteProductButtonComponent></DeleteProductButtonComponent>
      </div>
    </div>
  );
}

export default ManageProductsPage;
