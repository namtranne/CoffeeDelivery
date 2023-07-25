import { Image, Pressable, Text } from "react-native";
import { View } from "react-native";
import { themeColors } from "../theme";
export const RedeemCard = () => {
  return (
    <View className="flex-row w-max mb-8 justify-center">
      <View>
        <Image
          className="w-16 h-16 z-10"
          source={require("../assets/images/coffee1.png")}
        ></Image>
        <View className="w-12 h-12 bg-slate-300 absolute bottom-0 right-0 z-0 rounded-full"></View>
      </View>
      <View className="justify-center ml-4">
        <Text
          className="text-lg font-medium"
          style={{ color: themeColors.bgDark }}
        >
          Cafe Latte
        </Text>
        <Text className="text-sm text-slate-300">Valid until 28.07.23</Text>
      </View>
      <View className="items-center justify-center ml-8">
        <Pressable
          className="w-20 h-8 items-center justify-center rounded-full"
          style={{ backgroundColor: themeColors.bgDark }}
          textStyle={{ fontSize: 10 }}
        >
          <Text className="text-white">1234 pts</Text>
        </Pressable>
      </View>
    </View>
  );
};
