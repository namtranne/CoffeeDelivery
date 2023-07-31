import { Image, Text, TouchableHighlight, View } from "react-native";
import { themeColors } from "../theme";
import { StarIcon } from "react-native-heroicons/solid";
import { coffeeItems } from "../constants";
import { categories } from "../constants";
import { removeFromFavorite } from "../util/http";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
export const FavoriteCard = ({ data, handleRemoveFromFavorite }) => {
  const displayCoffee = coffeeItems.find((c) => c.id == data);
  const category = categories.find((c) => c.id == displayCoffee.categoryId);
  return (
    <View className="p-2 w-max h-32">
      <TouchableHighlight
        onPress={handleRemoveFromFavorite.bind(this, data)}
        //   style={styles.rowFront}
        className="items-center justify-center h-28 bg-gray-50 rounded-lg w-max p-1 shadow-sm shadow-black"
        underlayColor={"#AAA"}
      >
        <View className="flex-row">
          <View style={{ flex: 3 }} className="items-center justify-center">
            <Image className="w-20 h-20 " source={displayCoffee.image} />
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flex: 1 }}>
              <Text
                className="font-extrabold text-base"
                style={{ color: themeColors.bgDark }}
              >
                {displayCoffee.name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-gray-500">{category.title}</Text>
            </View>
            <View style={{ flex: 1 }} className="items-center flex-row">
              <StarIcon size="15" color="rgb(120 113 108)" />
              <Text className="text-base font-semibold text-stone-500">
                {displayCoffee.stars}
              </Text>
            </View>
          </View>
          <View style={{ flex: 2 }} className="items-center justify-center">
            <Image
              className="h-12 w-12"
              source={require("../assets/images/fullStar.png")}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
