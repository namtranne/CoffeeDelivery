import { Pressable, StyleSheet, Text, View } from "react-native";
import { themeColors } from "../theme";
import { CommonButton } from "./ui/CommonButton";
import { useNavigation } from "@react-navigation/native";

export const MyPointCard = ({ orders }) => {
  const pointPerCup = 12;
  let displayPoint = 0;
  for (let i = 0; i < orders.length; i++) {
    displayPoint += 12 * orders[i].items.length;
  }
  const navigation = useNavigation();
  return (
    <View
      className="rounded-lg h-30 p-8 items-center flex-row justify-between"
      style={styles.LoyaltyCard}
    >
      <View className="flex-column mb-2">
        <Text className="font-normal text-white text-base">My Points:</Text>
        <Text className="text-2xl font-medium text-white">{displayPoint}</Text>
      </View>
      <View>
        <CommonButton
          onPress={() => navigation.navigate("redeem")}
          title="Redeem drinks"
          style={{
            backgroundColor: "#A2CDE9",
            width: 93,
            height: 28,
            opacity: 0.5,
          }}
          textStyle={{ fontSize: 10 }}
        ></CommonButton>
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
