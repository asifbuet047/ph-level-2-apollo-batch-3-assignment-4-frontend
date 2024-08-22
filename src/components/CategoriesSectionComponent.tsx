import { PropagateLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { updateFilter } from "../redux/features/products/filterSlice";
import { TFilterData } from "../types/AllTypes";
import { useGetCategoriesQuery } from "../redux/api/allApiEndpoints";
import { Alert } from "@mui/material";

function CategoriesSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetCategoriesQuery(
    [],
    {}
  );
  const allCategories: string[] = data?.data as string[];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let filterData: TFilterData = {
    filter_name: "category",
    filter_value: "",
    filter_quantity: 0,
    filter_checked: true,
  };

  return (
    <div className="mt-2 mb-2">
      <div>
        <p className="text-6xl text-center p-5 font-bold">Product Categories</p>
      </div>
      {isSuccess && (
        <div className="flex flex-row justify-center items-center gap-4">
          {allCategories.map((category, index) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={index}
              className="text-xl"
              onClick={() => {
                filterData.filter_value = category;
                dispatch(updateFilter(filterData));
                navigate("/products");
              }}
            >
              #{category}
            </motion.button>
          ))}
        </div>
      )}
      {isFetching && (
        <div className="flex flex-row justify-center items-center">
          <PropagateLoader color="#CBA32A" />
        </div>
      )}
      {isError && (
        <div className="flex flex-row justify-center">
          <Alert variant="outlined" severity="error" className="w-1/2">
            No Internet Connection
          </Alert>
        </div>
      )}
    </div>
  );
}

export default CategoriesSectionComponent;
