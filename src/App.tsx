import { BarLoader } from "react-spinners";
import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "./redux/features/products/productsApi";

function App() {
  const { data, isFetching, error, isLoading, isSuccess } = useGetProductQuery(
    "668eb57f2989d79cafa8e80c"
  );
  console.log(data);
  return (
    <>
      {isFetching && <BarLoader></BarLoader>}
      {isSuccess && <div>Success</div>}
      {}
    </>
  );
}

export default App;
