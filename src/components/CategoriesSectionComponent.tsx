import { PropagateLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { clearFilter, updateFilter } from "../redux/features/filterSlice";
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

  return (
    <div className="mt-2 mb-2">
      <div>
        <p className="text-6xl text-center p-5 font-bold">Product Categories</p>
      </div>
      {isSuccess && (
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-1 md:gap-2 lg:gap-4">
          {allCategories.map((category, index) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={index}
              className="text-sm md:text-base lg:text-lg text-center"
              onClick={() => {
                const activeFilter: TFilterData = {
                  filter_name: "category",
                  filter_checked: true,
                  filter_quantity: 1,
                  filter_value: category,
                };
                dispatch(clearFilter());
                dispatch(updateFilter(activeFilter));
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
        <div className="flex flex-row justify-center items-center">
          <Alert variant="outlined" severity="error" className="w-1/2">
            No Internet Connection
          </Alert>
        </div>
      )}
    </div>
  );
}

export default CategoriesSectionComponent;
