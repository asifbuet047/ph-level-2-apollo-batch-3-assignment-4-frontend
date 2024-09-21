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
    <div className="flex flex-col md:flex-row flex-grow justify-between items-center md:h-[60vh] bg-[#C0F5FA]">
      <div onClick={addProduct} className="m-2 flex flex-col w-full">
        <AddProductButtonComponent></AddProductButtonComponent>
      </div>

      <div onClick={updateProduct} className="m-2 flex flex-col w-full">
        <UpdateProductButtonComponent></UpdateProductButtonComponent>
      </div>

      <div onClick={deleteProduct} className="m-2 flex flex-col w-full">
        <DeleteProductButtonComponent></DeleteProductButtonComponent>
      </div>
    </div>
  );
}

export default ManageProductsPage;
