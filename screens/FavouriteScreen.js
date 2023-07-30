import { useEffect, useState } from "react";
import { FavoriteCard } from "../components/FavoriteCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { getFavorite } from "../util/http";

export const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function fetchFavorite() {
      const fetchFavorites = await getFavorite();
      setFavorites(fetchFavorites);
    }
    fetchFavorite();
  }, []);
  return (
    <CommonLayout title="Favorite">
      {favorites.map((favorite, index) => {
        return <FavoriteCard data={favorite} key={index}></FavoriteCard>;
      })}
    </CommonLayout>
  );
};
