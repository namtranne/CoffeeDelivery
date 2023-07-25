import { FavoriteCard } from "../components/FavoriteCard";
import { CommonLayout } from "../components/Layout/CommonLayout";

export const FavoriteScreen = () => {
  return (
    <CommonLayout title="Favorite">
      <FavoriteCard></FavoriteCard>
      <FavoriteCard></FavoriteCard>
      <FavoriteCard></FavoriteCard>
    </CommonLayout>
  );
};
