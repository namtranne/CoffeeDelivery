import { Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { themeColors } from "../theme";
export const OrderItem = () => {
  return (
    <View className="border-b border-neutral-100 mb-8">
      <View className="my-1">
        <Text className="text-xs text-stone-300">24 June | 12:30 PM</Text>
      </View>
      <View className="flex-row my-1">
        <MaterialCommunityIcons
          name="cup"
          size={20}
          color={themeColors.bgDark}
        />
        <Text className="ml-3" style={{ color: themeColors.bgDark }}>
          Americano
        </Text>
      </View>
      <View className="flex-row my-1">
        <Ionicons
          name="ios-location-outline"
          size={20}
          color={themeColors.bgDark}
        />
        <Text className="ml-2" style={{ color: themeColors.bgDark }}>
          {" "}
          14 raymondiene, Tan Phu district, Ward 7
        </Text>
      </View>
      <View className="absolute top-1 right-2">
        <Text style={{ color: themeColors.bgDark }} className="text-lg">
          $3.00
        </Text>
      </View>
    </View>
  );
};
