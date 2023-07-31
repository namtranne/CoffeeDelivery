import { Image, Pressable, Text } from "react-native";
import { View } from "react-native";
import { themeColors } from "../theme";
import { coffeeItems } from "../constants";
export const RedeemCard = ({ id, point, handleTradeCoffee }) => {
  const displayCoffee = coffeeItems.find((c) => c.id == id);
  return (
    <View className="flex-row w-max mb-8 justify-center">
      <View>
        <Image className="w-16 h-16 z-10" source={displayCoffee.image}></Image>
        <View className="w-12 h-12 bg-slate-300 absolute bottom-0 right-0 z-0 rounded-full"></View>
      </View>
      <View className="justify-center ml-4">
        <Text
          className="text-lg font-medium"
          style={{ color: themeColors.bgDark }}
        >
          {displayCoffee.name}
        </Text>
        <Text className="text-sm text-slate-300">Valid until 28.07.23</Text>
      </View>
      <View className="items-center justify-center ml-8">
        <Pressable
          onPress={handleTradeCoffee.bind(this, point)}
          className="w-20 h-8 items-center justify-center rounded-full"
          style={{ backgroundColor: themeColors.bgDark }}
          textStyle={{ fontSize: 10 }}
        >
          <Text className="text-white">{point} pts</Text>
        </Pressable>
      </View>
    </View>
  );
};
