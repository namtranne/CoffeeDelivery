import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { ShoppingBag } from "react-native-feather";
import { CoffeeOptions } from "../components/CoffeeOptions";
import { QuantitySelect } from "../components/QuantitySelect";
import { addFavorite, getFavorite, removeFromFavorite } from "../util/http";
import { CartContext } from "../store/cart-context";
import { AuthContext } from "../store/auth-context";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function ProductScreen(props) {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const item = props.route.params;
  const [size, setSize] = useState("small");
  const [shot, setShot] = useState("single");
  const [ice, setIce] = useState("0%");
  const [sugar, setSugar] = useState("0%");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    async function fetchFavorites() {
      const token = authCtx.token;
      const UID = authCtx.UID;
      let favorites = await getFavorite(token, UID);
      if (favorites && favorites.indexOf(item.id) >= 0) {
        setIsFavorite(true);
      }
    }
    fetchFavorites();
  }, []);
  const navigation = useNavigation();
  function addToCart() {
    const cartList = cartCtx.cartList;
    if (cartList.length >= 7) {
      Alert.alert("Cart overload!", "Can not add more than 7 items to cart");
      return;
    }
    const idList = cartList.map((item) => item.id);
    let newItemId = 0;
    for (let i = 1; i <= 7; i++) {
      if (idList.indexOf(i) == -1) {
        newItemId = i;
        break;
      }
    }
    cartCtx.addToCart({
      id: newItemId,
      name: item.name,
      price: item.price,
      image: item.image,
      size: size,
      shot: shot,
      ice: ice,
      sugar: sugar,
      quantity: quantity,
    });
    navigation.navigate("cart");
  }

  function handleAddFavorite(id) {
    const token = authCtx.token;
    const UID = authCtx.UID;
    addFavorite(id, token, UID);
    setIsFavorite(true);
  }

  function handleRemoveFavorite(id) {
    const token = authCtx.token;
    const UID = authCtx.UID;
    removeFromFavorite(item.id, token, UID);
    setIsFavorite(false);
  }

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={
          item.id === 9
            ? require("../assets/images/matchaBackground.jpg")
            : item.id === 10
            ? require("../assets/images/chocolateBackground.jpg")
            : require("../assets/images/beansBackground2.png")
        }
        style={{
          height: 240,
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
        }}
        className="w-full absolute"
      />
      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity
            className=" rounded-full "
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          {!isFavorite ? (
            <TouchableOpacity
              className=" rounded-full border-2 border-white p-2"
              onPress={handleAddFavorite.bind(this, item.id)}
            >
              <HeartIcon size="24" color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className=" rounded-full border-2 border-white p-2"
              onPress={handleRemoveFavorite.bind(this, item.id)}
            >
              <HeartIcon size="24" color="red" />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 30 },
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center"
        >
          <Image
            source={item.image}
            className="h-52 w-52"
            style={{ marginTop: ios ? 0 : 40 }}
          />
        </View>
        <View
          style={{ backgroundColor: themeColors.bgLight }}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16"
        >
          <StarIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">
            {item.stars}
          </Text>
        </View>
        <View className="px-4 flex-row justify-between items-center">
          <Text
            style={{ color: themeColors.text }}
            className="text-3xl font-semibold"
          >
            {item.name}
          </Text>
          <Text
            style={{ color: themeColors.text }}
            className="text-lg font-semibold"
          >
            $ {item.price}
          </Text>
        </View>

        {/* Options */}
        <CoffeeOptions
          setOption={setSize}
          options={["Small", "Medium", "Large"]}
          currentOption={size}
        >
          Coffee Size
        </CoffeeOptions>
        <CoffeeOptions
          setOption={setShot}
          options={["Single", "Double"]}
          currentOption={shot}
        >
          Shot
        </CoffeeOptions>
        <CoffeeOptions
          setOption={setIce}
          options={["0%", "30%", "70%", "100%"]}
          currentOption={ice}
        >
          Ice
        </CoffeeOptions>
        <CoffeeOptions
          setOption={setSugar}
          options={["0%", "30%", "70%", "100%"]}
          currentOption={sugar}
        >
          Sugar
        </CoffeeOptions>

        <View className="px-4 space-y-2">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg font-bold"
          >
            About
          </Text>
          <Text className="text-gray-600">{item.desc}</Text>
        </View>
      </SafeAreaView>
      <View className={`space-y-3 ${ios ? "mb-6" : "mb-3"}`}>
        <View className="flex-row justify-between items-center px-4 mb-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-base text-gray-700 font-semibold opacity-60">
              Total:
            </Text>
            <Text className="text-base text-black font-semibold">
              {"$ "}
              {(item.price * quantity).toFixed(2)}
            </Text>
          </View>

          {/* Select amount */}
          <QuantitySelect
            currentQuantity={quantity}
            setQuantity={setQuantity}
          ></QuantitySelect>
        </View>
        {/* buy now button */}
        <View className="flex-row justify-between px-4">
          <TouchableOpacity
            className="p-4 rounded-full border border-gray-400"
            onPress={() => navigation.navigate("cart")}
          >
            <ShoppingBag size="30" color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgLight }}
            className="p-4 rounded-full flex-1 ml-4"
            onPress={addToCart.bind(this, quantity)}
          >
            <Text className="text-center text-white text-base font-semibold">
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
