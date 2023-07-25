import { Pressable, Text, View } from "react-native";
import { themeColors } from "../../theme";

export const CommonButton = ({ onPress, title, style, textStyle }) => {
  return (
    <View
      style={[{ backgroundColor: themeColors.bgDark }, style]}
      className="rounded-full overflow-hidden justify-center"
    >
      <Pressable
        android_ripple={{ color: "grey" }}
        className="h-16 items-center justify-center"
        onPress={onPress}
      >
        <Text className="text-lg font-semibold text-white" style={textStyle}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};
