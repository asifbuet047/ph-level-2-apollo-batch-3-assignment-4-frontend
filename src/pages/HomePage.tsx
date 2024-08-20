import CategoriesSectionComponent from "../components/CategoriesSectionComponent";
import DiscountCarouselSectionComponent from "../components/DiscountCarouselSectionComponent";
import FeaturedProductsSectionComponent from "../components/FeaturedProductsSectionComponent";

function HomePage() {
  return (
    <div className="h-auto">
      <DiscountCarouselSectionComponent />
      <FeaturedProductsSectionComponent />
      <CategoriesSectionComponent />
    </div>
  );
}

export default HomePage;
