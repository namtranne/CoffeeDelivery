import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "AIzaSyA-eCYkuWe4DMVwAlDc6DpqAaAPcQxYB2Q";

export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};
export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  AsyncStorage.setItem("UID", response.data.localId);
  AsyncStorage.setItem("email", email);
  AsyncStorage.setItem("password", password);
  const token = response.data.idToken;
  return token;
}
