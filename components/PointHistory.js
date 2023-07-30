import { Pressable, ScrollView, Text, View } from "react-native";
import { themeColors } from "../theme";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
export const PointHistory = ({ orders }) => {
  console.log(orders);
  return (
    <View className="mx-2 my-4">
      <Text
        style={{ color: themeColors.bgDark }}
        className="font-semibold mb-4"
      >
        History Rewards
      </Text>
      <ScrollView>
        {orders.map((order, index) => {
          const options = {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };
          const displayDate = Intl.DateTimeFormat("en", options).format(
            order.date
          );
          return (
            <Pressable
              key={index}
              className="border-b border-neutral-100 mb-4"
              //   onPress={handleOnPress}
            >
              <View className="my-1">
                <Text className="text-xs text-stone-300 mb-4">
                  {displayDate}
                </Text>
              </View>
              {order.items.map((item, index) => {
                return (
                  <View className="flex-row my-1" key={index}>
                    <MaterialCommunityIcons
                      name="cup"
                      size={20}
                      color={themeColors.bgDark}
                    />
                    <Text
                      className="ml-3"
                      style={{ color: themeColors.bgDark }}
                    >
                      {item.name} x {item.quantity}
                    </Text>
                  </View>
                );
              })}

              <View className="flex-row my-1"></View>
              <View className="absolute top-1 right-2">
                <Text style={{ color: themeColors.bgDark }} className="text-lg">
                  +{order.items.length * 12}pts
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
