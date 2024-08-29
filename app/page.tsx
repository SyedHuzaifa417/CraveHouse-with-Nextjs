import RecipeCategories from "@/components/home-components/categories";
import HomeHeader from "@/components/home-components/homeHeader";
import RecipeSharing from "@/components/home-components/recipeSharing";
import Reviews from "@/components/home-components/reviews";
import StayInTouch from "@/components/home-components/stayInTouch";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <RecipeCategories />
      <RecipeSharing />
      <Reviews />
      <StayInTouch />
    </>
  );
}
