import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { Feather } from "@expo/vector-icons";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { CommonButton } from "../components/ui/CommonButton";
import { CartContext } from "../store/cart-context";
import { CartItem } from "../components/CartItem";
import { getUserInfo, placeNewOrder } from "../util/http";
import { AuthContext } from "../store/auth-context";

const rowTranslateAnimatedValues = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

export const MyCartScreen = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const ios = Platform.OS == "ios";
  const navigation = useNavigation();

  const [listData, setListData] = useState(
    cartCtx.cartList.map((item) => ({ key: item.id, data: item }))
  );
  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        cartCtx.removeFromCart(key);
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        this.animationIsRunning = false;
      });
    }
  };

  const handlePlaceOrder = async () => {
    const cartList = cartCtx.cartList;
    const token = authCtx.token;
    const UID = authCtx.UID;
    const userInfo = await getUserInfo(token, UID);
    console.log(userInfo);
    if (
      !userInfo ||
      !userInfo["Phone number"] ||
      !userInfo["Address"] ||
      !userInfo["Full name"]
    ) {
      Alert.alert(
        "Missing user information",
        "Please fullfil your information to place an order",
        [
          {
            text: "Add information",
            onPress: () => navigation.navigate("account"),
            style: { color: "gray" },
          },
          {
            text: "Cancel",
          },
        ]
      );
    } else {
      const token = authCtx.token;
      const UID = authCtx.UID;
      placeNewOrder(cartList, token, UID);
      for (let i = 0; i < cartList.length; i++) {
        cartCtx.removeAll();
      }
      navigation.navigate("OrderSuccess");
    }
  };

  const renderHiddenItem = () => (
    <Animated.View className="flex-1 p-2">
      <View className="h-28 rounded-lg">
        <View className="absolute right-0 top-0 items-center rounded-lg bg-red-200 w-16 h-28 justify-center">
          <Feather name="trash" size={24} color="red" />
        </View>
      </View>
    </Animated.View>
  );
  return (
    <CommonLayout title={""} goBackButton={true}>
      <Text
        className="m-4 text-xl font-semibold"
        style={{ color: themeColors.bgDark }}
      >
        MY CART
      </Text>

      <View className="flex-1">
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={CartItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          recalculateHiddenLayout={true}
        />
      </View>
      {listData.length > 0 && (
        <CommonButton
          title="Place Order"
          onPress={handlePlaceOrder}
        ></CommonButton>
      )}
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
