import { RedeemCard } from "../components/RedeemCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { LoyaltyCard } from "../components/LoyaltyCard";
import { MyPointCard } from "../components/MyPointCard";
import { useEffect, useState } from "react";
import { getOrders } from "../util/http";
import { PointHistory } from "../components/PointHistory";

export const RewardScreen = ({ navigation }) => {
  const [reRender, setRerender] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRerender((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrders();
      orders.sort((item1, item2) => {
        return item2.date - item1.date;
      });
      setOrders(orders.filter((order) => order.state === "delivered"));
    }
    fetchOrders();
  }, [reRender]);
  // console.log(orders);
  return (
    <CommonLayout title="Rewards">
      <LoyaltyCard></LoyaltyCard>
      <MyPointCard orders={orders}></MyPointCard>
      <PointHistory orders={orders}></PointHistory>
    </CommonLayout>
  );
};
