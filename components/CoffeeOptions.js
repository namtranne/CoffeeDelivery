import { Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
export const CoffeeOptions = ({
  children,
  setOption,
  options,
  currentOption,
}) => {
  return (
    <View className="px-4 space-y-2 flex-row items-center justify-between">
      <Text
        style={{ color: themeColors.text }}
        className="text-base font-semibold"
      >
        {children}
      </Text>
      <View className="flex-row justify-around">
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setOption(option.toLowerCase())}
              style={{
                backgroundColor:
                  currentOption === option.toLowerCase()
                    ? themeColors.bgLight
                    : "rgba(0,0,0,0.07)",
              }}
              className="p-2 px-3 rounded-full ml-1 mr-1"
            >
              <Text
                className={
                  currentOption === option.toLowerCase()
                    ? "text-white"
                    : "text-gray-700"
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
