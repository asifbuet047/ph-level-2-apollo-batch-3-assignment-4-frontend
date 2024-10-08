import { Divider } from "@mui/material";
import CategoriesSectionComponent from "../components/CategoriesSectionComponent";
import ContactUsSectionComponent from "../components/ContactUsSectionComponent";
import DiscountCarouselSectionComponent from "../components/DiscountCarouselSectionComponent";
import FeaturedProductsSectionComponent from "../components/FeaturedProductsSectionComponent";
import OurTeamSectionComponent from "../components/OurTeamSectionComponent";

function HomePage() {
  return (
    <div className="bg-[#C0F5FA]">
      <DiscountCarouselSectionComponent />
      <Divider />
      <FeaturedProductsSectionComponent />
      <Divider />
      <CategoriesSectionComponent />
      <Divider />
      <ContactUsSectionComponent />
      <Divider />
      <OurTeamSectionComponent />
    </div>
  );
}

export default HomePage;
