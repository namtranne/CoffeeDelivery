import {
  AuthenticatedAppNavigation,
  UnAuthenticatedAppNavigation,
} from "./navigation/appNavigation";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { AppLoadingScreen } from "./screens/AppLoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  if (authCtx.isAuthenticated) {
    return <AuthenticatedAppNavigation></AuthenticatedAppNavigation>;
  }
  return <UnAuthenticatedAppNavigation></UnAuthenticatedAppNavigation>;
};

const Root = () => {
  const [isTryingLoggin, setIsTryingLoggin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem("token");
      const UID = await AsyncStorage.getItem("UID");
      const email = await AsyncStorage.getItem("email");
      if (token && UID && email) {
        authCtx.authenticate(token, UID, email);
      }
      setIsTryingLoggin(false);
    }
    fetchToken();
  }, []);
  if (isTryingLoggin) {
    return <AppLoadingScreen />;
  }
  return <Navigation />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <Root></Root>
    </AuthContextProvider>
  );
}
