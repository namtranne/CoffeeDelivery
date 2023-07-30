import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { themeColors } from "../theme";
import { updateOrderState } from "../util/http";
export const OrderItem = ({ data, moveToHistory, triggerReRender }) => {
  // console.log(data);
  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  async function handleOnPress() {
    if (data.state === "delivering") {
      const res = await updateOrderState(data);
      triggerReRender();
      moveToHistory();
    }
  }
  const displayDate = Intl.DateTimeFormat("en", options).format(data.date);
  return (
    <Pressable
      className="border-b border-neutral-100 mb-8"
      onPress={handleOnPress}
    >
      <View className="my-1">
        <Text className="text-xs text-stone-300">{displayDate}</Text>
      </View>
      {data.items.map((item) => {
        return (
          <View className="flex-row my-1">
            <MaterialCommunityIcons
              name="cup"
              size={20}
              color={themeColors.bgDark}
            />
            <Text className="ml-3" style={{ color: themeColors.bgDark }}>
              {item.name} x {item.quantity}
            </Text>
          </View>
        );
      })}

      <View className="flex-row my-1">
        <Ionicons
          name="ios-location-outline"
          size={20}
          color={themeColors.bgDark}
        />
        <Text className="ml-2" style={{ color: themeColors.bgDark }}>
          {" "}
          {data.Address}
        </Text>
      </View>
      <View className="absolute top-1 right-2">
        <Text style={{ color: themeColors.bgDark }} className="text-lg">
          ${data.total}
        </Text>
      </View>
    </Pressable>
  );
};
