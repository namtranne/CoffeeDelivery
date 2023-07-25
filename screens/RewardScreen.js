import { RedeemCard } from "../components/RedeemCard";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { LoyaltyCard } from "../components/LoyaltyCard";
import { MyPointCard } from "../components/MyPointCard";

export const RewardScreen = () => {
  return (
    <CommonLayout title="Rewards">
      <LoyaltyCard></LoyaltyCard>
      <MyPointCard></MyPointCard>
    </CommonLayout>
  );
};
