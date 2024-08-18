import DiscountCarouselComponent from "../components/DiscountCarouselComponent";
import FeaturedProducts from "../components/FeaturedProducts";

function HomePage() {
  return (
    <div className="h-auto">
      <DiscountCarouselComponent />
      <FeaturedProducts />
    </div>
  );
}

export default HomePage;
