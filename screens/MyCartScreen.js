import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { Feather } from "@expo/vector-icons";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { CommonButton } from "../components/UI/CommonButton";

const rowTranslateAnimatedValues = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

export const MyCartScreen = () => {
  const ios = Platform.OS == "ios";
  const navigation = useNavigation();

  const [listData, setListData] = useState(
    Array(4)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );
  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        this.animationIsRunning = false;
      });
    }
  };

  const renderItem = (data) => (
    <Animated.View className="p-2 w-max h-32">
      <TouchableHighlight
        onPress={() => console.log("You touched me")}
        style={styles.rowFront}
        className="items-center justify-center h-28 bg-gray-50 rounded-lg w-max p-1 shadow-sm shadow-black"
        underlayColor={"#AAA"}
      >
        <View className="flex-row">
          <View style={{ flex: 3 }} className="items-center justify-center">
            <Image
              className="w-20 h-20 "
              source={require("../assets/images/coffee1.png")}
            />
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flex: 1 }}>
              <Text
                className="font-extrabold text-base"
                style={{ color: themeColors.bgDark }}
              >
                Americano
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-gray-500">
                single | iced | medium | full ice
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="font-semibold text-base text-gray-600">x 1</Text>
            </View>
          </View>
          <View style={{ flex: 2 }} className="items-center justify-center">
            <Text className="font-bold">$150.00</Text>
          </View>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );

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
          renderItem={renderItem}
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
      <CommonButton
        title="Place Order"
        onPress={() => navigation.navigate("OrderSuccess")}
      ></CommonButton>
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
