import { RedeemCard } from "../components/RedeemCard";
import { CommonLayout } from "../components/Layout/CommonLayout";

export const RedeemScreen = () => {
  return (
    <CommonLayout title="Redeem" goBackButton={true}>
      <RedeemCard></RedeemCard>
      <RedeemCard></RedeemCard>
      <RedeemCard></RedeemCard>
    </CommonLayout>
  );
};
