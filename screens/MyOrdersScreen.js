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
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { OrderItem } from "../components/OrderCard";
import { getOrders } from "../util/http";
import { OrdersRender } from "../components/OrdersRender";
import { useFocusEffect } from "@react-navigation/native";
export const MyOrdersScreen = ({ navigation }) => {
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRerender((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);
  const ios = Platform.OS == "ios";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, setRef] = useState(null);
  const [slides, setSlides] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  function triggerReRender() {
    setRerender((prev) => !prev);
  }
  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrders();
      orders.sort((item1, item2) => {
        return item2.date - item1.date;
      });
      setSlides([
        {
          id: 1,
          data: orders.filter((order) => order.state === "delivering"),
          moveToHistory: moveToHistory,
          triggerReRender: triggerReRender,
        },
        {
          id: 2,
          data: orders.filter((order) => order.state === "delivered"),
        },
      ]);
    }
    fetchOrders();
  }, [reRender]);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (ref) {
      ref.scrollToIndex({
        animated: true,
        index: currentIndex,
        viewPosition: 0,
      });
    }
  }, [currentIndex]);
  useEffect(() => {
    setCurrentIndex(0);
  }, []);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  function moveToHistory() {
    setCurrentIndex(1);
  }

  return (
    <CommonLayout
      title={<Text className="text-xl font-normal">My Orders</Text>}
    >
      <View className="flex-row px-12 justify-between">
        <Pressable
          className={currentIndex == 0 ? "p-5 border-b-2" : "p-5"}
          style={{ borderBottomColor: themeColors.bgDark }}
          onPress={() => setCurrentIndex(0)}
        >
          <Text
            className={
              "text-base" + (currentIndex == 1 ? " text-slate-300" : "")
            }
          >
            On going
          </Text>
        </Pressable>
        <Pressable
          className={currentIndex == 1 ? "p-5 border-b-2" : "p-5"}
          style={{ borderBottomColor: themeColors.bgDark }}
          onPress={() => setCurrentIndex(1)}
        >
          <Text
            className={
              "text-base" + (currentIndex == 0 ? " text-slate-300" : "")
            }
          >
            History
          </Text>
        </Pressable>
      </View>
      {slides && (
        <FlatList
          data={slides}
          className="border-t border-neutral-100"
          pagingEnabled={true}
          renderItem={OrdersRender}
          horizontal={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={(ref) => {
            setRef(ref);
          }}
        ></FlatList>
      )}
    </CommonLayout>
  );
};
