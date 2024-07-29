import { Card } from "antd";
import AddProductButton from "../components/AddProductButton";
import UpdateProductButton from "../components/UpdateProductButton";
import DeleteProductButton from "../components/DeleteProductButton";
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
        <AddProductButton></AddProductButton>
      </div>

      <div onClick={updateProduct} className="m-2 flex-grow w-full">
        <UpdateProductButton></UpdateProductButton>
      </div>

      <div onClick={deleteProduct} className="m-2 flex-grow w-full">
        <DeleteProductButton></DeleteProductButton>
      </div>
    </div>
  );
}

export default ManageProductsPage;
