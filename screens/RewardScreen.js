import { RedeemCard } from "../components/RedeemCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { LoyaltyCard } from "../components/LoyaltyCard";
import { MyPointCard } from "../components/MyPointCard";
import { useContext, useEffect, useState } from "react";
import { getLoyalPoint, getOrders, getRedeemPoint } from "../util/http";
import { PointHistory } from "../components/PointHistory";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export const RewardScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [reRender, setRerender] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loyalPoint, setLoyalPoint] = useState(0);
  const [redeemPoint, setRedeemPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRerender((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      const token = authCtx.token;
      const UID = authCtx.UID;
      const orders = await getOrders(token, UID);
      orders.sort((item1, item2) => {
        return item2.date - item1.date;
      });
      setOrders(orders);
      const point = await getLoyalPoint(token, UID);
      setLoyalPoint(point);
      const redeemPoint = await getRedeemPoint(token, UID);
      setRedeemPoint(redeemPoint);
      setIsLoading(false);
    }
    fetchOrders();
  }, [reRender]);
  if (isLoading) {
    return <LoadingOverlay></LoadingOverlay>;
  }
  return (
    <CommonLayout title="Rewards">
      <LoyaltyCard point={loyalPoint}></LoyaltyCard>
      <MyPointCard point={redeemPoint}></MyPointCard>
      <PointHistory orders={orders}></PointHistory>
    </CommonLayout>
  );
};
