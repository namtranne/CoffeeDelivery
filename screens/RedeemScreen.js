import { RedeemCard } from "../components/RedeemCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { getRedeemPoint, updateRedeemPoint } from "../util/http";
import { Alert } from "react-native";

export const RedeemScreen = () => {
  const authCtx = useContext(AuthContext);
  const handleTradeCoffee = async (point) => {
    const token = authCtx.token;
    const UID = authCtx.UID;
    const currentPoint = await getRedeemPoint(token, UID);
    if (currentPoint < point) {
      Alert.alert(
        "Trading unsuccessfully",
        "You don't have enough point to trade this product!"
      );
      return;
    }
    await updateRedeemPoint(token, UID, currentPoint - point);
    Alert.alert(
      "Trading successfully",
      "You have " + (currentPoint - point) + " points left"
    );
  };
  return (
    <CommonLayout title="Redeem" goBackButton={true}>
      <RedeemCard
        id="1"
        point="123"
        handleTradeCoffee={handleTradeCoffee}
      ></RedeemCard>
      <RedeemCard
        id="2"
        point="124"
        handleTradeCoffee={handleTradeCoffee}
      ></RedeemCard>
      <RedeemCard
        id="10"
        point="125"
        handleTradeCoffee={handleTradeCoffee}
      ></RedeemCard>
    </CommonLayout>
  );
};
