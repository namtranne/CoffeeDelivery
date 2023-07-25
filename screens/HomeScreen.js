import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { StatusBar } from "expo-status-bar";
import { categories, coffeeItems } from "../constants";
import Carousel from "react-native-snap-carousel";
import CoffeeCard from "../components/coffeeCard";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { LoyaltyCard } from "../components/LoyaltyCard";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigation = useNavigation();
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
              Anderson
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
          </View>
        </View>

        {/* Loyalty Card */}
        <LoyaltyCard></LoyaltyCard>

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
