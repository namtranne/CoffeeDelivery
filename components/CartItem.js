import { Text } from "react-native";
import { Image } from "react-native";
import { TouchableHighlight, View } from "react-native";
import { themeColors } from "../theme";
export const CartItem = (data) => {
  const renderData = data.item.data;
  return (
    <View className="p-2 w-max h-32">
      <TouchableHighlight
        onPress={() => console.log("You touched me")}
        className="items-center justify-center h-28 bg-gray-50 rounded-lg w-max p-1 shadow-sm shadow-black"
        underlayColor={"#AAA"}
      >
        <View className="flex-row">
          <View style={{ flex: 3 }} className="items-center justify-center">
            <Image className="w-20 h-20 " source={renderData.image} />
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flex: 1 }}>
              <Text
                className="font-extrabold text-base"
                style={{ color: themeColors.bgDark }}
              >
                {renderData.name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-gray-500 items-center justify-center">
                {renderData.shot} | {renderData.size} | {renderData.sugar} sugar
                | {renderData.ice} ice
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className="font-semibold text-base text-gray-600">
                x {renderData.quantity}
              </Text>
            </View>
          </View>
          <View style={{ flex: 2 }} className="items-center justify-center">
            <Text className="font-bold">
              ${renderData.price * renderData.quantity}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
