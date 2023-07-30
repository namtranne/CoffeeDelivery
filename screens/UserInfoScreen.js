import { useEffect, useState } from "react";
import { CommonInput } from "../components/Layout/CommonInput";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { getUserInfo } from "../util/http";

export const UserInfoScreen = () => {
  const [userInfo, setUserInfo] = useState({
    Email: "",
    "Phone number": "",
    Address: "",
    "Full name": "",
  });
  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await getUserInfo();
      setUserInfo({ ...userInfo });
    }
    fetchUserInfo();
  }, []);

  return (
    <CommonLayout title="Profile" goBackButton={true}>
      <CommonInput
        title="Full name"
        iconName="user"
        defaultValue={userInfo["Full name"]}
      ></CommonInput>
      <CommonInput
        title="Phone number"
        iconName="phone"
        defaultValue={userInfo["Phone number"]}
      ></CommonInput>
      <CommonInput
        title="Email"
        iconName="mail"
        defaultValue={userInfo.Email}
      ></CommonInput>
      <CommonInput
        title="Address"
        iconName="enviromento"
        defaultValue={userInfo.Address}
      ></CommonInput>
    </CommonLayout>
  );
};
