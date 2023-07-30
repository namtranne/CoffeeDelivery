import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import axios from "axios";

const URL =
  "https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/";
export const addFavorite = async (productId) => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  const favoriteList = await getFavorite();
  axios
    .patch(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/favorite/.json?auth=${token}`,
      {
        favoriteList: [...favoriteList, productId],
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const placeNewOrder = async (cartList) => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  const userInfo = await getUserInfo();
  let total = 0;
  for (let i = 0; i < cartList.length; i++) {
    total += cartList[i].price * cartList[i].quantity;
  }
  console.log(userInfo.Address);
  const order = {
    items: cartList,
    date: new Date(),
    total: total,
    Address: userInfo.Address,
    state: "delivering",
  };
  axios
    .post(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/order.json?auth=${token}`,
      order
    )
    .then((res) => {
      console.log(res);
    });
};

export const getOrders = () => {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem("token");
    const UID = await AsyncStorage.getItem("UID");
    const expenses = [];
    axios
      .get(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/order.json?auth=${token}`
      )
      .then((response) => {
        for (const key in response.data) {
          const expenseObj = {
            items: response.data[key].items,
            date: new Date(response.data[key].date),
            total: response.data[key].total,
            state: response.data[key].state,
            Address: response.data[key].Address,
            key: key,
          };
          expenses.push(expenseObj);
        }
        resolve(expenses);
      });
  });
};

export const updateOrderState = async (order) => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  const key = order.key;
  delete order.key;
  console.log(key);
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/order/${key}/.json?auth=${token}`,
        {
          ...order,
          state: "delivered",
        }
      )
      .then((res) => {
        resolve(res);
      });
  });
};

export const getUserInfo = async () => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/user.json?auth=${token}`
      )
      .then((res) => {
        resolve(res.data);
      });
  });
};

export const updateUserInfo = async (title, value) => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  const userInfo = await getUserInfo();
  let data = { ...userInfo, [title]: value };
  axios
    .patch(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/user/.json?auth=${token}`,
      data
    )
    .then((res) => {
      console.log(res.status);
    });
};

export const removeFromFavorite = async (productId) => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  const favoriteList = await getFavorite();

  axios
    .patch(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/favorite/.json?auth=${token}`,
      {
        favoriteList: favoriteList.filter((id) => id != productId),
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const getFavorite = async () => {
  const token = await AsyncStorage.getItem("token");
  const UID = await AsyncStorage.getItem("UID");
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/favorite/favoriteList.json?auth=${token}`
      )
      .then((res) => {
        resolve(res.data);
      });
  });
};
