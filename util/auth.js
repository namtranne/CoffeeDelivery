import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { initLoyalPoints, initRedeemPoints } from "./http";

const API_KEY = "AIzaSyA-eCYkuWe4DMVwAlDc6DpqAaAPcQxYB2Q";

export const createUser = async (email, password) => {
  const { token, UID } = await authenticate("signUp", email, password);
  console.log(token, UID);
  await initLoyalPoints(token, UID);
  await initRedeemPoints(token, UID);
  return { token, UID, email };
};
export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};

async function authenticate(mode, email, password) {
  console.log(mode, email, password);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios
    .post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .catch((err) => {
      console.log("could not create user");
    });
  const token = response.data.idToken;
  const UID = response.data.localId;
  return { token, UID };
}
