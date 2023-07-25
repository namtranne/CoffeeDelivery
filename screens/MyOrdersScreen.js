import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { OrderItem } from "../components/OrderCard";
export const MyOrdersScreen = () => {
  const ios = Platform.OS == "ios";
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const slides = [
    { key: 1, data: 1 },
    { key: 2, data: 2 },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log(scrollX);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  return (
    <CommonLayout
      title={<Text className="text-xl font-normal">My Orders</Text>}
    >
      <View className="flex-row px-12 justify-between">
        <View
          className={currentIndex == 0 ? "p-5 border-b-2" : "p-5"}
          style={{ borderBottomColor: themeColors.bgDark }}
        >
          <Text
            className={
              "text-base" + (currentIndex == 1 ? " text-slate-300" : "")
            }
          >
            On going
          </Text>
        </View>
        <View
          className={currentIndex == 1 ? "p-5 border-b-2" : "p-5"}
          style={{ borderBottomColor: themeColors.bgDark }}
        >
          <Text
            className={
              "text-base" + (currentIndex == 0 ? " text-slate-300" : "")
            }
          >
            History
          </Text>
        </View>
      </View>
      <FlatList
        data={slides}
        className="border-t border-neutral-100"
        pagingEnabled={true}
        renderItem={() => (
          <View
            className="items-center justify-center p-8"
            style={{ width: screenWidth - 32 }}
          >
            <View className="h-8 flex-1" style={{ width: screenWidth - 96 }}>
              <OrderItem></OrderItem>
              <OrderItem></OrderItem>
              <OrderItem></OrderItem>
            </View>
          </View>
        )}
        horizontal={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      ></FlatList>
    </CommonLayout>
  );
};
