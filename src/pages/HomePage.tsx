import { Divider } from "@mui/material";
import CategoriesSectionComponent from "../components/CategoriesSectionComponent";
import ContactUsSectionComponent from "../components/ContactUsSectionComponent";
import DiscountCarouselSectionComponent from "../components/DiscountCarouselSectionComponent";
import FeaturedProductsSectionComponent from "../components/FeaturedProductsSectionComponent";

function HomePage() {
  return (
    <div className="h-auto">
      <DiscountCarouselSectionComponent />
      <FeaturedProductsSectionComponent />
      <CategoriesSectionComponent />
      <ContactUsSectionComponent />
    </div>
  );
}

export default HomePage;
