import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { StatusBar } from "expo-status-bar";
import { categories, coffeeItems } from "../constants";
import Carousel from "react-native-snap-carousel";
import CoffeeCard from "../components/coffeeCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LoyaltyCard } from "../components/LoyaltyCard";
import { AuthContext } from "../store/auth-context";
import { getLoyalPoint, getUserInfo } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
const { width } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [reRender, setRerender] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRerender((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);
  const authCtx = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loyalPoint, setLoyalPoint] = useState(0);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = authCtx.token;
      const UID = authCtx.UID;
      const userInfo = await getUserInfo(token, UID);
      // console.log(userInfo);
      if (userInfo) {
        if (userInfo["Full name"]) {
          setUserName(userInfo["Full name"]);
        }
      }
      const point = await getLoyalPoint(token, UID);
      setLoyalPoint(point);
      setIsLoading(false);
    }
    fetchData();
  }, [reRender]);
  if (isLoading) {
    return <LoadingOverlay></LoadingOverlay>;
  }
  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />
      <SafeAreaView className={ios ? "-mb-8" : ""}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <View>
            <Text className="font-medium text-sm" style={{ color: "#e1e1e1" }}>
              Good morning
            </Text>
            <Text
              className="font-semibold text-xl"
              style={{ color: themeColors.bgDark }}
            >
              {isLoading ? "..." : userName}
            </Text>
          </View>

          <View className="flex-row">
            <Pressable
              onPress={() => navigation.navigate("account")}
              className="p-3"
            >
              <AntDesign name="user" size={26} color="black" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("cart")}
              className="p-3"
            >
              <AntDesign name="shoppingcart" size={26} color="black" />
            </Pressable>
            <Pressable onPress={() => authCtx.logout()} className="p-3">
              <AntDesign name="logout" size={26} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Loyalty Card */}
        <LoyaltyCard point={loyalPoint}></LoyaltyCard>

        {/* categories */}
        <View className="px-5 mt-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            className="overflow-visible"
            renderItem={({ item }) => {
              isActive = item.id == activeCategory;
              let activeTextClass = isActive ? "text-white" : "text-gray-700";
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{
                    backgroundColor: isActive
                      ? themeColors.bgLight
                      : "rgba(0,0,0,0.07)",
                  }}
                  className="p-4 px-5 mr-2 rounded-full shadow"
                >
                  <Text className={"font-semibold " + activeTextClass}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>

      {/* coffee cards */}
      <View
        className={`overflow-visible flex justify-center flex-1 ${
          ios ? "mt-10" : ""
        }`}
      >
        <View>
          <Carousel
            containerCustomStyle={{ overflow: "visible" }}
            data={
              activeCategory == null
                ? coffeeItems
                : coffeeItems.filter(
                    (item) => item.categoryId == activeCategory
                  )
            }
            renderItem={({ item }) => <CoffeeCard item={item} />}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
      </View>
    </View>
  );
}
