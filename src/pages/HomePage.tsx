import Footer from "../components/Footer";
import Header from "../components/Header";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";

function HomePage() {
  const {
    data: products,
    isFetching,
    isSuccess,
  } = useGetAllProductsQuery(undefined);
  console.log(products);
  return (
    <div className="h-screen">
      <body className="border-red-500 border-2">
        {isSuccess &&
          products.data.map((product, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={product.product_image_url} alt={product.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Rating: {product.rating}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        {isFetching && <BarLoader></BarLoader>}
      </body>
    </div>
  );
}

export default HomePage;
