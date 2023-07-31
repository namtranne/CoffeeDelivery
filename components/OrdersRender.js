import { Dimensions, ScrollView, View } from "react-native";
import { OrderItem } from "./OrderCard";

export const OrdersRender = ({ item }) => {
  //   console.log("function", item.triggerReRender);
  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      className="items-center justify-center p-8"
      style={{ width: screenWidth - 32 }}
    >
      <View className="h-8 flex-1" style={{ width: screenWidth - 96 }}>
        <ScrollView className="flex-1">
          {item.data.map((data, index) => {
            return (
              <OrderItem
                key={index}
                data={data}
                moveToHistory={item.moveToHistory}
                triggerReRender={item.triggerReRender}
              ></OrderItem>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
