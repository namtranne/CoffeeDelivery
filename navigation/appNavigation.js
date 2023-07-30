import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { Dimensions, LogBox, Platform, Text, View } from "react-native";
import ProductScreen from "../screens/ProductScreen";
import { themeColors } from "../theme";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon as HomeOutline,
  HeartIcon as HeartOutline,
  ShoppingBagIcon as BagOutline,
  NewspaperIcon as NewspaperOutline,
  GiftIcon as GiftOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  ShoppingBagIcon as BagSolid,
  NewspaperIcon as NewspaperSolid,
  GiftIcon as GiftSolid,
} from "react-native-heroicons/solid";
import { MyCartScreen } from "../screens/MyCartScreen";
import { MyOrdersScreen } from "../screens/MyOrdersScreen";
import { RewardScreen } from "../screens/RewardScreen";
import { UserInfoScreen } from "../screens/UserInfoScreen";
import { FavoriteScreen } from "../screens/FavouriteScreen";
import { OrderSuccessScreen } from "../screens/OrderSuccessScreen";
import { RedeemScreen } from "../screens/RedeemScreen";
// import LoginScreen from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { CartContextProvider } from "../store/cart-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == "ios";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export const AuthenticatedAppNavigation = () => {
  return (
    <CartContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeTabs}
          />
          <Stack.Screen
            name="Product"
            options={{ headerShown: false }}
            component={ProductScreen}
          />
          <Stack.Screen
            name="cart"
            options={{ headerShown: false }}
            component={MyCartScreen}
          />
          <Stack.Screen
            name="account"
            options={{ headerShown: false }}
            component={UserInfoScreen}
          />
          <Stack.Screen
            name="OrderSuccess"
            options={{ headerShown: false }}
            component={OrderSuccessScreen}
          />
          <Stack.Screen
            name="redeem"
            options={{ headerShown: false }}
            component={RedeemScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContextProvider>
  );
};

export const UnAuthenticatedAppNavigation = () => {
  console.log("AuthStack");
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: "center",

          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="reward" component={RewardScreen} />
      <Tab.Screen name="favorite" component={FavoriteScreen} />
      <Tab.Screen name="MyOrders" component={MyOrdersScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "home") {
    icon = focused ? (
      <HomeSolid size="30" color={themeColors.bgLight} />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "favorite") {
    icon = focused ? (
      <HeartSolid size="30" color={themeColors.bgLight} />
    ) : (
      <HeartOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "MyOrders") {
    icon = focused ? (
      <NewspaperSolid size="30" color={themeColors.bgLight} />
    ) : (
      <NewspaperOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "reward") {
    icon = focused ? (
      <GiftSolid size="30" color={themeColors.bgLight} />
    ) : (
      <GiftOutline size="30" strokeWidth={2} color="white" />
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View
      className={"flex items-center rounded-full p-3 shadow " + buttonClass}
    >
      {icon}
    </View>
  );
};
