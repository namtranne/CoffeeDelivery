import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";

export const QuantitySelect = ({ currentQuantity, setQuantity }) => {
  function increaseQuantity() {
    setQuantity(currentQuantity + 1);
  }
  function decreaseQuantity() {
    if (currentQuantity === 0) return;
    setQuantity(currentQuantity - 1);
  }
  return (
    <View className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
      <TouchableOpacity onPress={decreaseQuantity}>
        <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
      </TouchableOpacity>
      <Text
        style={{ color: themeColors.text }}
        className="font-extrabold text-lg"
      >
        {currentQuantity}
      </Text>
      <TouchableOpacity onPress={increaseQuantity}>
        <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
      </TouchableOpacity>
    </View>
  );
};
