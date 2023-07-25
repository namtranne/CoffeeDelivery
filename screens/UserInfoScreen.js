import { CommonInput } from "../components/Layout/CommonInput";
import { CommonLayout } from "../components/Layout/CommonLayout";

export const UserInfoScreen = () => {
  return (
    <CommonLayout title="Profile" goBackButton={true}>
      <CommonInput title="Full name" iconName="user"></CommonInput>
      <CommonInput title="Phone number" iconName="phone"></CommonInput>
      <CommonInput title="Email" iconName="mail"></CommonInput>
      <CommonInput title="Address" iconName="enviromento"></CommonInput>
    </CommonLayout>
  );
};
