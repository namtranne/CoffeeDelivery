import { Image, StyleSheet, Text, View } from "react-native";
import { themeColors } from "../theme";
export const LoyaltyCard = () => {
  return (
    <View
      className="rounded-lg h-30 p-4 justify-center"
      style={styles.LoyaltyCard}
    >
      <View className="flex-row justify-between mb-2">
        <Text className="font-medium text-white text-lg">Loyalty Card</Text>
        <Text className="font-medium text-white text-lg">0/8</Text>
      </View>
      <View className="flex-row justify-between p-3 bg-white rounded-lg">
        {Array.from(new Array(8)).map((item) => {
          return (
            <Image
              source={require("../assets/images/loyalCupSolid.jpg")}
              className="h-8 w-8"
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoyaltyCard: {
    backgroundColor: themeColors.bgDark,
    marginTop: 24,
    // height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
});
