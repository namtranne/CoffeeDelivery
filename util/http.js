import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import axios from "axios";

const URL =
  "https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/";
export const addFavorite = async (productId, token, UID) => {
  const favoriteList = await getFavorite(token, UID);
  axios
    .patch(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/favorite/.json?auth=${token}`,
      {
        favoriteList: favoriteList ? [...favoriteList, productId] : [productId],
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const placeNewOrder = async (cartList, token, UID) => {
  const userInfo = await getUserInfo(token, UID);
  let total = 0;
  let loyalPoint = 0;
  let redeemPoint = 0;
  for (let i = 0; i < cartList.length; i++) {
    total += cartList[i].price * cartList[i].quantity;
    loyalPoint += cartList[i].quantity;
    redeemPoint += cartList[i].quantity * 12;
  }
  const order = {
    items: cartList,
    date: new Date(),
    total: total,
    Address: userInfo.Address,
    state: "delivering",
  };
  let currentLoyalPoint = await getLoyalPoint(token, UID);
  let currentRedeemPoint = await getRedeemPoint(token, UID);
  currentRedeemPoint += redeemPoint;
  currentLoyalPoint += loyalPoint;
  if (currentLoyalPoint >= 8) {
    currentLoyalPoint = 8;
  }
  updateLoyalPoint(token, UID, currentLoyalPoint);
  updateRedeemPoint(token, UID, currentRedeemPoint);
  const response = await axios.post(
    `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/order.json?auth=${token}`,
    order
  );
};

export const getOrders = (token, UID) => {
  return new Promise(async (resolve, reject) => {
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
        console.log("expenses", expenses);
        resolve(expenses);
      })
      .catch((error) => {
        console.log("Can not get orders");
      });
  });
};

export const updateOrderState = async (order, token, UID) => {
  const key = order.key;
  delete order.key;
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

export const getUserInfo = async (token, UID) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/user.json?auth=${token}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => console.log(err));
  });
};

export const updateUserInfo = async (title, value, token, UID) => {
  const userInfo = await getUserInfo(token, UID);
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

export const removeFromFavorite = async (productId, token, UID) => {
  const favoriteList = await getFavorite(token, UID);
  axios
    .patch(
      `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/favorite/.json?auth=${token}`,
      {
        favoriteList: favoriteList.filter((id) => id != productId),
      }
    )
    .then((res) => {
      return res;
    });
};

export const getFavorite = async (token, UID) => {
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

export const initLoyalPoints = (token, UID) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/loyalPoint/.json?auth=${token}`,
        {
          point: 0,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => console.log("Can not init loyal point!!"));
  });
};

export const initRedeemPoints = (token, UID) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/redeemPoint/.json?auth=${token}`,
        {
          point: 0,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => console.log("Can not init redeem point!!"));
  });
};

export const updateLoyalPoint = (token, UID, point) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/loyalPoint/.json?auth=${token}`,
        {
          point: point,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => console.log("Can not update loyal point!!"));
  });
};
export const updateRedeemPoint = (token, UID, point) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/redeemPoint/.json?auth=${token}`,
        {
          point: point,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => console.log("Can not update redeem point!!"));
  });
};

export const getLoyalPoint = async (token, UID) => {
  const response = await axios.get(
    `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/loyalPoint/.json?auth=${token}`
  );
  return response.data ? response.data.point : 0;
};

export const getRedeemPoint = async (token, UID) => {
  const response = await axios.get(
    `https://react-native-authen-c8e68-default-rtdb.asia-southeast1.firebasedatabase.app/${UID}/redeemPoint/.json?auth=${token}`
  );
  return response.data ? response.data.point : 0;
};
