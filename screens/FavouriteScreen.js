import { useContext, useEffect, useState } from "react";
import { FavoriteCard } from "../components/FavoriteCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { getFavorite, removeFromFavorite } from "../util/http";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

export const FavoriteScreen = () => {
  const authCtx = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [reRender, setRerender] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRerender((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    async function fetchFavorite() {
      const token = authCtx.token;
      const UID = authCtx.UID;
      const fetchFavorites = await getFavorite(token, UID);
      if (fetchFavorites == null) return;
      setFavorites(fetchFavorites);
    }
    fetchFavorite();
  }, [reRender]);
  const handleRemoveFromFavorite = (data) => {
    setFavorites([...favorites.filter((f) => f != data)]);
    const token = authCtx.token;
    const UID = authCtx.UID;
    removeFromFavorite(data, token, UID);
  };
  return (
    <CommonLayout title="Favorite">
      {favorites.map((favorite, index) => {
        return (
          <FavoriteCard
            data={favorite}
            key={index}
            handleRemoveFromFavorite={handleRemoveFromFavorite}
          ></FavoriteCard>
        );
      })}
    </CommonLayout>
  );
};
