import { Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { themeColors } from "../../theme";
export const CommonInput = ({ title, iconName }) => {
  return (
    <View className="flex-row w-max justify-start mx-8 mb-8">
      <View className="mr-4 item-center justify-center h-max">
        <View className="w-12 h-12 rounded-full bg-sky-50 items-center justify-center">
          <AntDesign name={iconName} size={24} color="black" />
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <Text className="text-stone-300">{title}</Text>
        <Text
          className="font-semibold text-lg"
          style={{ color: themeColors.bgDark }}
        >
          3 Addersion Court Chino Hills, HO56824, United State
        </Text>
      </View>
      <View className="items-end justify-center" style={{ flex: 2 }}>
        <FontAwesome5 name="edit" size={24} color="black" />
      </View>
    </View>
  );
};
