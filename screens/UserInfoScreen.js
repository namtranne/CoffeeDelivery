import { useContext, useEffect, useState } from "react";
import { CommonInput } from "../components/Layout/CommonInput";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { getUserInfo, updateUserInfo } from "../util/http";
import { AuthContext } from "../store/auth-context";

export const UserInfoScreen = () => {
  const authCtx = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    Email: "",
    "Phone number": "",
    Address: "",
    "Full name": "",
  });
  const handleUpdateUserInfo = (title, newInfo) => {
    setUserInfo({ ...userInfo, [title]: newInfo });
    const token = authCtx.token;
    const UID = authCtx.UID;
    updateUserInfo(title, newInfo, token, UID);
  };
  useEffect(() => {
    async function fetchUserInfo() {
      const token = authCtx.token;
      const UID = authCtx.UID;
      const email = authCtx.email;
      const userFetchInfo = await getUserInfo(token, UID);
      setUserInfo({ ...userFetchInfo, Email: email });
    }
    fetchUserInfo();
  }, []);

  return (
    <CommonLayout title="Profile" goBackButton={true}>
      <CommonInput
        title="Full name"
        iconName="user"
        value={userInfo["Full name"]}
        handleUpdateUserInfo={handleUpdateUserInfo}
      ></CommonInput>
      <CommonInput
        title="Phone number"
        iconName="phone"
        value={userInfo["Phone number"]}
        handleUpdateUserInfo={handleUpdateUserInfo}
      ></CommonInput>
      <CommonInput
        title="Email"
        iconName="mail"
        value={userInfo.Email}
        handleUpdateUserInfo={handleUpdateUserInfo}
      ></CommonInput>
      <CommonInput
        title="Address"
        iconName="enviromento"
        value={userInfo.Address}
        handleUpdateUserInfo={handleUpdateUserInfo}
      ></CommonInput>
    </CommonLayout>
  );
};
