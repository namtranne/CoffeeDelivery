import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert, Text } from "react-native";
import { AuthContext } from "../store/auth-context";

export const LoginScreen = () => {
  //   console.log("LoginScreen");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      // console.log("login", token);
      authCtx.authenticate(token);
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Authentication fail!",
        "Could not log you in, please check your credentials and try again"
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..."></LoadingOverlay>;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

// export default LoginScreen;
