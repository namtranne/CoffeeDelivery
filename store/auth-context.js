import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
  token: "",
  UID: "",
  email: "",
  isAuthenticated: false,
  authenticate: (token, UID, email) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [UID, setUID] = useState();
  const [email, setEmail] = useState();
  function authenticate(token, UID, email) {
    setAuthToken(token);
    setUID(UID);
    setEmail(email);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("UID", UID);
    AsyncStorage.setItem("email", email);
  }

  function logout() {
    setAuthToken(null);
    setUID(null);
    setEmail(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("UID");
    AsyncStorage.removeItem("email");
  }

  const value = {
    UID: UID,
    token: authToken,
    email: email,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
